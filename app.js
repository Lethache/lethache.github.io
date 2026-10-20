'use strict';
const profile = window.PORTFOLIO;
const grid = document.querySelector('#projects');
const technicalGrid = document.querySelector('#technical-projects');
const dialog = document.querySelector('#project-dialog');
let opener;
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function safeURL(value) { try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) ? u.href : ''; } catch { return ''; } }
function visualKey(project) { return project.category === 'C#' ? 'csharp' : project.category === 'C++' ? 'cpp' : 'web'; }
function projectImages(project) { return project.images || []; }
function coverImage(project) { return projectImages(project)[0]; }
function cardLinks(project) {
  return (project.links || []).filter(link => link.url !== project.externalDemo?.url || Boolean(project.externalDemo?.embed)).map(link => {
    const href = safeURL(link.url); if (!href) return '';
    return `<a class="card-source ${link.private ? 'is-private' : ''}" href="${escapeHTML(href)}" target="_blank" rel="noopener noreferrer">${escapeHTML(link.private ? 'Private repository' : link.label)} <span aria-hidden="true">↗</span>${link.private ? '<span class="access-label">Access required</span>' : ''}</a>`;
  }).join('');
}
function demoAction(project) {
  const label = project.externalDemo?.label || project.mediaAction;
  if (project.externalDemo && !project.externalDemo.embed) return `<a class="card-demo" href="${escapeHTML(project.externalDemo.url)}" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">▶</span>${escapeHTML(label)} <span class="demo-duration">${escapeHTML(project.externalDemo.duration)}</span><span aria-hidden="true">↗</span></a>`;
  return `<button type="button" class="card-demo ${project.video || project.externalDemo ? '' : 'is-gallery'}" data-project="${escapeHTML(project.id)}" data-start="${project.video || project.externalDemo ? 'demo' : 'images'}" aria-haspopup="dialog">${project.video || project.externalDemo ? '<span aria-hidden="true">▶</span>' : ''}${escapeHTML(label)}${project.video?.duration ? `<span class="demo-duration">${escapeHTML(project.video.duration)}</span>` : ''}</button>`;
}
function renderProjects() {
  grid.innerHTML = profile.projects.filter(project => !project.technical).map((project, index) => {
    const image = coverImage(project);
    const isVideo = Boolean(project.video || project.externalDemo);
    const previewBody = `<img src="${escapeHTML(project.video?.poster || image.src)}" alt="${escapeHTML(image.alt)}" style="object-fit:${project.id === 'taskhero' || project.id === 'solar-system' ? 'contain' : 'cover'}" ${index ? 'loading="lazy"' : ''}><span class="preview-type">${escapeHTML(project.coverLabel || 'PROJECT CAPTURE')}</span><span class="preview-label">${isVideo ? '<span class="preview-play" aria-hidden="true">▶</span>' : '<span class="preview-play preview-explore" aria-hidden="true">↗</span>'}<span><strong>${escapeHTML(project.previewLabel)}</strong><small>${escapeHTML(project.previewMeta)}</small></span></span>`;
    const externalPreview = project.externalDemo && !project.externalDemo.embed ? project.externalDemo.url : null;
    const preview = externalPreview ? `<a class="project-preview" href="${escapeHTML(externalPreview)}" target="_blank" rel="noopener noreferrer" aria-label="Watch ${escapeHTML(project.title)} app demonstration on Google Drive">${previewBody}</a>` : `<button class="project-preview" data-project="${escapeHTML(project.id)}" data-start="${isVideo ? 'demo' : 'images'}" aria-haspopup="dialog" aria-label="${escapeHTML(project.previewLabel)} — ${escapeHTML(project.title)}">${previewBody}</button>`;
    return `<article id="project-${escapeHTML(project.id)}" class="project-card ${index === 0 ? 'project-feature' : ''}" style="--index:${index}">${preview}<div class="project-card-content"><div class="project-overline"><span>${String(index + 1).padStart(2, '0')} /</span><span>${escapeHTML(project.stack)}</span></div><h3>${escapeHTML(project.title)}</h3><p class="project-summary">${escapeHTML(project.summary)}</p><div class="project-card-actions">${demoAction(project)}${cardLinks(project)}<button type="button" class="card-case-study" data-project="${escapeHTML(project.id)}" data-start="default" aria-haspopup="dialog">Case study <span aria-hidden="true">↗</span></button></div>${project.id === 'dx12-lighting' ? '<p class="card-scope-note">GitHub link: early Win32 scaffold. The recording shows the later renderer and tools.</p>' : ''}</div></article>`;
  }).join('');
  technicalGrid.innerHTML = profile.projects.filter(project => project.technical).map(project => `<article id="project-${escapeHTML(project.id)}" class="project-technical"><div class="technical-card-top"><span class="technical-language">${escapeHTML(project.category)}</span><span class="technical-kind">${escapeHTML(project.kind)}</span></div><h4>${escapeHTML(project.title)}</h4><p class="technical-subtitle">${escapeHTML(project.subtitle)}</p><p class="technical-description">${escapeHTML(project.summary)}</p><p class="technical-stack">${escapeHTML(project.stack)}</p><div class="technical-card-actions">${cardLinks(project)}<button type="button" class="card-case-study" data-project="${escapeHTML(project.id)}" data-start="default" aria-haspopup="dialog">Case study <span aria-hidden="true">↗</span></button></div></article>`).join('');
}
let activeProject = null;
let activeMedia = [];
let mediaIndex = 0;
const stage = document.querySelector('#dialog-art');
const galleryControls = document.querySelector('#gallery-controls');
const galleryThumbnails = document.querySelector('#gallery-thumbnails');
function pauseMedia() { stage.querySelector('video')?.pause(); const frame = stage.querySelector('iframe'); if (frame) frame.src = 'about:blank'; }
function renderMedia() {
  pauseMedia();
  const item = activeMedia[mediaIndex];
  stage.className = `dialog-art visual-${visualKey(activeProject)} ${item ? 'has-media' : ''}`;
  stage.setAttribute('aria-label', item ? `${activeProject.title}, ${item.type === 'video' || item.type === 'embed' ? 'video' : 'image'} ${mediaIndex + 1} of ${activeMedia.length}. Use left and right arrow keys to browse.` : `${activeProject.title} project media`);
  stage.replaceChildren();
  if (!item) {
    stage.textContent = '';
    document.querySelector('#gallery-caption').textContent = '';
  } else if (item.type === 'video') {
    const video = document.createElement('video');
    video.controls = true; video.preload = 'none'; video.playsInline = true;
    video.src = item.src; if (item.poster) video.poster = item.poster;
    video.setAttribute('aria-label', item.title || `${activeProject.title} video`);
    const fallback = document.createElement('p'); fallback.textContent = 'Your browser does not support this video.'; video.append(fallback);
    stage.append(video);
    document.querySelector('#gallery-caption').textContent = item.caption || item.title || 'Project demonstration';
  } else if (item.type === 'embed') {
    const frame = document.createElement('iframe'); frame.src = item.src; frame.title = item.title; frame.loading = 'lazy'; frame.allow = 'fullscreen'; frame.allowFullscreen = true; frame.referrerPolicy = 'strict-origin-when-cross-origin'; stage.append(frame);
    document.querySelector('#gallery-caption').textContent = item.caption;
  } else {
    const img = document.createElement('img'); img.src = item.src; img.alt = item.alt || `${activeProject.title} project capture`;
    stage.append(img);
    document.querySelector('#gallery-caption').textContent = item.caption || 'Project capture';
  }
  const openMedia = document.querySelector('#gallery-open');
  document.querySelector('#gallery-source').hidden = !item;
  if (item) { openMedia.href = item.type === 'embed' ? item.url : item.src; openMedia.textContent = item.type === 'embed' ? 'Watch on Google Drive ↗' : item.type === 'video' ? 'Open video file ↗' : 'Open full-size image ↗'; }
  galleryControls.hidden = activeMedia.length < 2;
  galleryThumbnails.hidden = activeMedia.length < 2;
  document.querySelector('#gallery-counter').textContent = `${item?.type === 'video' || item?.type === 'embed' ? 'VIDEO' : 'IMAGE'} ${mediaIndex + 1} / ${activeMedia.length}`;
  galleryThumbnails.querySelectorAll('button').forEach((button, index) => {
    const active = index === mediaIndex;
    button.classList.toggle('selected', active);
    button.setAttribute('aria-pressed', String(active));
  });
}
function selectMedia(index) {
  if (!activeMedia.length) return;
  mediaIndex = (index + activeMedia.length) % activeMedia.length;
  renderMedia();
}
document.querySelector('#gallery-previous').addEventListener('click', () => selectMedia(mediaIndex - 1));
document.querySelector('#gallery-next').addEventListener('click', () => selectMedia(mediaIndex + 1));
stage.addEventListener('keydown', event => {
  if (event.target !== stage || activeMedia.length < 2) return;
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); selectMedia(mediaIndex + (event.key === 'ArrowRight' ? 1 : -1)); }
});
function openProject(project, origin, start = 'default') {
  if (!project) return;
  opener = origin; activeProject = project; mediaIndex = 0;
  activeMedia = projectImages(project).map(image => ({...image, type: 'image'}));
  if (project.video) activeMedia.push({...project.video, type: 'video'});
  if (project.externalDemo?.embed) activeMedia.push({...project.externalDemo, src: project.externalDemo.embed, type: 'embed', title: `${project.title} — recorded demonstration`, poster: projectImages(project)[0]?.src, caption: `Recorded app demonstration · ${project.externalDemo.duration} · Google Drive`});
  if (start !== 'images' && (project.video || (start === 'demo' && project.externalDemo?.embed))) mediaIndex = activeMedia.length - 1;
  galleryThumbnails.replaceChildren(...activeMedia.map((item, index) => {
    const button = document.createElement('button'); button.type = 'button';
    button.setAttribute('aria-label', item.type === 'video' || item.type === 'embed' ? `Show video: ${item.title || project.title}` : `Show image ${index + 1}: ${item.caption || item.alt || project.title}`);
    button.setAttribute('aria-pressed', 'false');
    const thumb = document.createElement('img'); thumb.src = item.type === 'video' || item.type === 'embed' ? (item.poster || projectImages(project)[0]?.src || '') : item.src; thumb.alt = ''; thumb.loading = 'lazy';
    if (thumb.getAttribute('src')) button.append(thumb);
    if (item.type === 'video' || item.type === 'embed') { const icon = document.createElement('span'); icon.className = 'thumbnail-play'; icon.textContent = '▶'; icon.setAttribute('aria-hidden', 'true'); button.append(icon); }
    button.addEventListener('click', () => selectMedia(index));
    return button;
  }));
  const hasMedia = activeMedia.length > 0;
  document.querySelector('#dialog-media').hidden = !hasMedia;
  dialog.classList.toggle('without-media', !hasMedia);
  if (hasMedia) renderMedia(); else { pauseMedia(); stage.replaceChildren(); }
  document.querySelector('#dialog-tech').textContent = project.stack;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-status').textContent = project.status;
  document.querySelector('#dialog-description').textContent = project.description;
  const list = document.querySelector('#dialog-contributions');
  list.replaceChildren(...project.contributions.map(value => { const li = document.createElement('li'); li.textContent = value; return li; }));
  document.querySelector('#dialog-design').textContent = project.design || '';
  document.querySelector('.dialog-design').hidden = !project.design;
  document.querySelector('#dialog-note').textContent = project.note;
  const links = document.querySelector('#dialog-links'); links.replaceChildren();
  const projectLinks = project.links?.length ? project.links : [{url: project.source, label: 'Source on GitHub'}, {url: project.demo, label: 'Explore website'}];
  for (const link of projectLinks) {
    const href = /^mailto:[^\s@]+@[^\s@]+\.[^\s@?]+(?:\?[^\s]*)?$/.test(link.url) ? link.url : safeURL(link.url); if (!href) continue;
    const a = document.createElement('a'); a.href = href; if (!href.startsWith('mailto:')) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    a.textContent = `${link.private ? 'Private repository' : link.label} ↗`;
    if (link.private) a.className = 'private-repository';
    links.append(a);
  }
  if (projectLinks.some(link => link.private)) {
    const note = document.createElement('p'); note.className = 'repository-access';
    note.textContent = 'Private repository · Access is required to view its code. The link does not grant access.'; links.append(note);
  }
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.style.overflow = 'hidden';
  document.querySelector('.dialog-close').focus({preventScroll: true});
}
function handleProjectClick(event) {
  const button = event.target.closest('[data-project]');
  if (button) openProject(profile.projects.find(p => p.id === button.dataset.project), button, button.dataset.start || 'default');
}
grid.addEventListener('click', handleProjectClick);
technicalGrid.addEventListener('click', handleProjectClick);
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const r = dialog.getBoundingClientRect();
  if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
});
dialog.addEventListener('close', () => { pauseMedia(); document.body.style.overflow = ''; if (opener?.isConnected) opener.focus({preventScroll: true}); });
renderProjects();
const total = String(profile.projects.length).padStart(2, '0');
document.querySelector('.header nav a span').textContent = total;
document.querySelector('#year').textContent = new Date().getFullYear();
const contacts = [];
if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) contacts.push(['mailto:' + profile.email, 'Email me ↗']);
for (const [url, label] of [[profile.github, 'GitHub ↗'], [profile.linkedin, 'LinkedIn ↗']]) { const href = safeURL(url); if (href) contacts.push([href, label]); }
if (contacts.length) {
  const area = document.querySelector('#contact-links'); area.replaceChildren();
  for (const [href, label] of contacts) { const a = document.createElement('a'); a.href = href; a.textContent = label; if (!href.startsWith('mailto:')) { a.target = '_blank'; a.rel = 'noopener noreferrer'; } area.append(a); }
}
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js-reveal');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), {threshold: .08});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
