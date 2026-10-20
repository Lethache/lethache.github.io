// Selected gameplay, graphics, tools, application, and networking projects.
window.PORTFOLIO = {
  "email": "mishalol8474@gmail.com",
  "github": "https://github.com/Lethache",
  "linkedin": "",
  "projects": [
    {
      "id": "how-to-dig",
      "category": "C#",
      "title": "How to Dig",
      "kind": "Co-op gameplay · Personal project",
      "featured": true,
      "visual": "dig",
      "status": "In development · Private source",
      "stack": "Unity · C# · TCP / UDP",
      "summary": "1–4 player co-op excavation: deformable terrain, a shared quota, and weather that changes the job.",
      "description": "A Unity co-op game in development where a crew digs through deformable ground, brings valuables back from the excavation, and meets a contract quota. Loot, personal equipment, health, stamina, and worsening weather turn a simple dig into a shared resource-management problem.",
      "contributions": [
        "Terrain: VoxelGround stores sparse excavation cuts; SoilMesher converts a density field into geometry using marching tetrahedra, with asynchronous chunk mesh generation.",
        "Multiplayer: LanSession carries host-authoritative gameplay over TCP. LanDiscovery uses UDP broadcast so players can find sessions on a local network.",
        "Enemy navigation: GoblinNavigation accounts for terrain height and ladder / rope traversal so a thief can navigate an excavation rather than only a flat surface.",
        "Expedition state: loot, inventory, quotas, personal equipment, health, and stamina are connected to career / checkpoint saves with backward-format compatibility.",
        "Environmental pressure: WeatherShift intensifies conditions; FloodWater handles rising water and clipping against the dig site."
      ],
      "note": "In-development LAN / direct-IP multiplayer. Steam integration and public matchmaking are outside the current implementation. Captures below are from the development trailer supplied for this portfolio.",
      "source": "",
      "demo": "",
      "design": "The central technical challenge is keeping an editable world, its navigation, and shared gameplay state coherent. Terrain meshing is split into chunks, the host owns gameplay decisions, and the game’s progression is serialized separately from the current expedition.",
      "links": [
        {
          "url": "https://github.com/Lethache/how-to-dig",
          "label": "Private repository",
          "private": true
        }
      ],
      "images": [
        {
          "src": "assets/projects/how-to-dig-yard.jpg",
          "alt": "Cooperative digging in the backyard dig site",
          "caption": "Gameplay trailer — shared dig site",
          "fit": "contain"
        },
        {
          "src": "assets/projects/how-to-dig-digging.jpg",
          "alt": "Excavation reveals a hole in the ground",
          "caption": "Gameplay trailer — terrain excavation",
          "fit": "contain"
        },
        {
          "src": "assets/projects/how-to-dig-coop.jpg",
          "alt": "Two player characters in an underground tunnel",
          "caption": "Gameplay trailer — underground co-op",
          "fit": "contain"
        },
        {
          "src": "assets/projects/how-to-dig-contract.jpg",
          "alt": "Excavation contract with crew signatures and quota",
          "caption": "Gameplay trailer — contract and crew preparation",
          "fit": "contain"
        },
        {
          "src": "assets/projects/how-to-dig-arcade.jpg",
          "alt": "Two characters beside the arcade machine",
          "caption": "Gameplay trailer — interactive arcade",
          "fit": "contain"
        }
      ],
      "video": {
        "src": "assets/projects/how-to-dig-trailer.mp4",
        "poster": "assets/projects/how-to-dig-yard.jpg",
        "title": "How to Dig gameplay trailer",
        "duration": "0:55"
      },
      "coverLabel": "GAMEPLAY TRAILER",
      "previewLabel": "Watch gameplay demo",
      "previewMeta": "0:55 · DEVELOPMENT TRAILER",
      "mediaAction": "Watch demo",
      "mediaKind": "video"
    },
    {
      "id": "dx12-lighting",
      "category": "C++",
      "title": "DX12 Lighting & Tools",
      "kind": "Graphics & tooling · Coursework",
      "featured": true,
      "visual": "lighting",
      "status": "Course project · Private submission",
      "stack": "C++ · DirectX 12 · HLSL · C++/CLI · WinForms",
      "summary": "A DirectX 12 scene with Phong lighting, HLSL shaders, and live controls through a tools DLL.",
      "description": "A graphics course project that connects a C++ DirectX 12 scene to HLSL lighting and a separate Windows Forms tools window. Camera movement, light movement, and material controls let the scene demonstrate how lighting changes as objects and viewpoints move.",
      "contributions": [
        "Built ambient, diffuse, and specular Phong lighting in HLSL, with scene and material parameters supplied from C++.",
        "Connected camera and light movement to the scene and added coordinate-based color behavior.",
        "Passed controls through a C++/CLI tools DLL so Windows Forms widgets can change renderer state.",
        "Extended the course scene with interpolated chase movement and collision handling."
      ],
      "note": "The linked public DX12 repository is an earlier Win32 scaffold. The later renderer, shaders, and tools shown here belong to a separate course submission.",
      "source": "",
      "demo": "",
      "design": "The project crosses a managed / native boundary: Windows Forms provides the controls, a tools DLL exposes their values, and the native renderer sends the resulting parameters to the shader. The displayed captures show the later lighting work.",
      "links": [
        {
          "url": "https://github.com/Lethache/DX12",
          "label": "Early Win32 scaffold",
          "private": false
        }
      ],
      "images": [
        {
          "src": "assets/projects/dx12-render.png",
          "alt": "Textured cubes and a moving light in the DirectX 12 application",
          "caption": "Application capture — textured cubes and specular lighting",
          "fit": "contain"
        },
        {
          "src": "assets/projects/dx12-tools.png",
          "alt": "ToolsForm lighting controls beside the rendered scene",
          "caption": "Submitted demo frame — runtime lighting controls",
          "fit": "contain"
        },
        {
          "src": "assets/projects/dx12-purple.png",
          "alt": "Two textured cubes with coloured illumination",
          "caption": "Application capture — coloured illumination",
          "fit": "contain"
        }
      ],
      "coverLabel": "APPLICATION CAPTURE",
      "previewLabel": "Watch runtime demo",
      "previewMeta": "2:08 · APPLICATION RECORDING",
      "mediaAction": "Watch demo",
      "mediaKind": "video",
      "video": {
        "src": "assets/projects/dx12-runtime-demo.mp4",
        "poster": "assets/projects/dx12-render.png",
        "title": "Runtime demo — lighting, shader controls and collision",
        "caption": "Recorded application demo · Lighting, shader controls, movement, and collision.",
        "duration": "2:08"
      }
    },
    {
      "id": "solar-system",
      "category": "C#",
      "title": "Solar System Editor",
      "kind": "Editor development · Coursework",
      "featured": true,
      "visual": "solar",
      "status": "Course project · Private source",
      "stack": "C# · MonoGame · Windows Forms",
      "summary": "A MonoGame / WinForms 3D editor with orbital simulation and binary .oce project files.",
      "description": "A Windows Forms editor with an embedded MonoGame renderer for composing a small solar system: one sun, up to five planets, and moons. The scene updates orbital motion and spin while the editor exposes camera and model state.",
      "contributions": [
        "Level.cs maintains the sun / planet / moon scene and updates orbit and spin behavior.",
        "Connected editor controls to the embedded renderer, camera, and scene models.",
        "Project.cs serializes and restores scene data through binary .oce project files.",
        "Added New, Open, and Save commands with Ctrl+N, Ctrl+O, and Ctrl+S keyboard shortcuts."
      ],
      "note": "Private academic repository. Its older README mentions an earlier teapot scene; the current Level.cs contains the solar-system implementation.",
      "source": "",
      "demo": "",
      "design": "The editor separates scene simulation from project persistence. A saved project records the scene configuration so it can be reopened and edited rather than reconstructed by hand.",
      "links": [
        {
          "url": "https://github.com/Lethache/Editor",
          "label": "Private repository",
          "private": true
        }
      ],
      "images": [
        {
          "src": "assets/projects/solar-scene.png",
          "alt": "Sun, planets and moons in the solar-system scene",
          "caption": "Project presentation — rendered solar-system scene",
          "fit": "contain"
        },
        {
          "src": "assets/projects/solar-planet.png",
          "alt": "Close view of Earth and moon in the editor scene",
          "caption": "Project presentation — planet detail",
          "fit": "contain"
        }
      ],
      "coverLabel": "PROJECT PRESENTATION",
      "previewLabel": "Explore the editor",
      "previewMeta": "PROJECT PRESENTATION · 2 IMAGES",
      "mediaAction": "View presentation",
      "mediaKind": "images"
    },
    {
      "id": "taskhero",
      "category": "C#",
      "title": "TaskHero · .NET MAUI",
      "kind": "Application development · Project",
      "featured": true,
      "visual": "taskhero",
      "status": "Public source",
      "stack": "C# · .NET MAUI · XAML",
      "summary": "Parent / child task assignment, approval, points, and rewards in a .NET MAUI app.",
      "description": "A .NET MAUI application with separate parent and child flows. Parents create and assign tasks, review completion, and manage gifts; children view their tasks, earn points after approval, and claim rewards from the gift shop.",
      "contributions": [
        "Implemented parent / child roles and the task assignment → completion → parent confirmation workflow.",
        "Connected confirmed tasks to points and gift-claim actions.",
        "Registered singleton manager services in MauiProgram.cs and passed them into screens through constructor dependency injection.",
        "Used ObservableCollection and INotifyPropertyChanged so XAML views react when tasks, rewards, and points change."
      ],
      "note": "The repository verifies the application’s in-memory manager and binding structure; a persistent backend is not part of the demonstrated scope.",
      "source": "https://github.com/Lethache/TaskHeroApp",
      "demo": "",
      "design": "Task and reward rules live in shared manager services instead of being duplicated in individual pages. Observable state propagates those changes to the parent and child interfaces.",
      "links": [
        {
          "url": "https://github.com/Lethache/TaskHeroApp",
          "label": "Source on GitHub",
          "private": false
        },
        {
          "url": "https://drive.google.com/file/d/1vIFb9HYl4fSIbNio2nB4Bl3ibKcnJaU1/view",
          "label": "Open full demo"
        }
      ],
      "images": [
        {
          "src": "assets/projects/taskhero-maui-child-dashboard.png",
          "alt": "TaskHero MAUI — Child dashboard and points",
          "caption": "App screenshot from project README — child dashboard and points",
          "fit": "contain"
        },
        {
          "src": "assets/projects/taskhero-maui-parent-dashboard.png",
          "alt": "TaskHero MAUI — Parent dashboard",
          "caption": "App screenshot from project README — parent dashboard",
          "fit": "contain"
        },
        {
          "src": "assets/projects/taskhero-maui-create-task.png",
          "alt": "TaskHero MAUI — Task creation",
          "caption": "App screenshot from project README — task creation",
          "fit": "contain"
        },
        {
          "src": "assets/projects/taskhero-maui-review-task.png",
          "alt": "TaskHero MAUI — Task review and approval",
          "caption": "App screenshot from project README — task review and approval",
          "fit": "contain"
        },
        {
          "src": "assets/projects/taskhero-maui-gift-shop.png",
          "alt": "TaskHero MAUI — Reward shop",
          "caption": "App screenshot from project README — reward shop",
          "fit": "contain"
        },
        {
          "src": "assets/projects/taskhero-maui-create-gift.png",
          "alt": "TaskHero MAUI — Gift setup",
          "caption": "App screenshot from project README — gift setup",
          "fit": "contain"
        },
        {
          "src": "assets/projects/taskhero-maui-confirm-gift.png",
          "alt": "TaskHero MAUI — Gift confirmation",
          "caption": "App screenshot from project README — gift confirmation",
          "fit": "contain"
        },
        {
          "src": "assets/projects/taskhero-maui-add-child.png",
          "alt": "TaskHero MAUI — Add child",
          "caption": "App screenshot from project README — add child",
          "fit": "contain"
        },
        {
          "src": "assets/projects/taskhero-maui-parent-registration.png",
          "alt": "TaskHero MAUI — Parent registration",
          "caption": "App screenshot from project README — parent registration",
          "fit": "contain"
        },
        {
          "src": "assets/projects/taskhero-maui-sign-in.png",
          "alt": "TaskHero MAUI — Sign-in",
          "caption": "App screenshot from project README — sign-in",
          "fit": "contain"
        }
      ],
      "coverLabel": "APP SCREENSHOT",
      "previewLabel": "Watch the app demo",
      "previewMeta": "6:16 · RECORDED APP WORKFLOW",
      "mediaAction": "Explore app flow",
      "mediaKind": "images",
      "externalDemo": {
        "url": "https://drive.google.com/file/d/1vIFb9HYl4fSIbNio2nB4Bl3ibKcnJaU1/view",
        "label": "Watch app demo",
        "duration": "6:16",
        "embed": "https://drive.google.com/file/d/1vIFb9HYl4fSIbNio2nB4Bl3ibKcnJaU1/preview"
      }
    },
    {
      "id": "arc-trader",
      "category": "Web",
      "title": "Arc Trader Nest",
      "kind": "Web dashboard",
      "featured": true,
      "visual": "web",
      "status": "Web project",
      "stack": "ARC Raiders · Web application",
      "summary": "An ARC Raiders trading hub with item search, exchange listings, community tabs, and detailed filters.",
      "description": "A web trading and community hub for ARC Raiders. The Trade Hub helps visitors find items and traders, while Trades, Party Finder, Forum, and Chat Room organize adjacent community activities.",
      "contributions": [
        "Developed the trading-hub interface with item / trader search and exchange listings.",
        "Organized navigation around Trade Hub, Trades, Party Finder, Forum, and Chat Room.",
        "Added visible filtering controls for item category, rarity, listing status, language, and sorting."
      ],
      "note": "Game trading and community project for ARC Raiders. The live website is public; source is in a private repository.",
      "source": "",
      "demo": "https://arctradersnest.com/",
      "design": "The interface makes a large item market easier to browse by combining a search entry point, category filters, and listing state in one trading view. The supplied capture shows the live site’s public Trade Hub.",
      "links": [
        {
          "url": "https://github.com/Lethache/arc-trader-nest",
          "label": "Private repository",
          "private": true
        },
        {
          "url": "https://arctradersnest.com/",
          "label": "Live website"
        }
      ],
      "images": [
        {
          "src": "assets/projects/arc-traders-live.jpg",
          "alt": "ARC Raiders Trade Hub with listings search and filters",
          "caption": "Live website capture — Trade Hub",
          "fit": "contain"
        }
      ],
      "coverLabel": "LIVE WEBSITE",
      "previewLabel": "Explore the Trade Hub",
      "previewMeta": "LIVE ARC RAIDERS WEBSITE",
      "mediaAction": "View website preview",
      "mediaKind": "images"
    },
    {
      "id": "raknet",
      "category": "C++",
      "title": "RakNet Client / Server",
      "kind": "Networking · Coursework",
      "featured": false,
      "status": "Course project · Private source",
      "stack": "C++ · RakNet · BitStream",
      "summary": "A RakNet client / server with eight incoming slots and reliable ordered BitStream messages.",
      "description": "A C++ client / server networking exercise using RakNet. The server accepts up to eight incoming clients, handles connection events, and exchanges text messages serialized with BitStream.",
      "contributions": [
        "Implemented client / server startup and connection-event handling in RakNetController.cpp.",
        "Serialized text messages with BitStream and sent them with RELIABLE_ORDERED delivery.",
        "Configured eight incoming client slots and cleaned up the RakNet peer when the application exits."
      ],
      "note": "Networking coursework, not a completed multiplayer game. Character movement is outside the verified source snapshot.",
      "source": "",
      "demo": "",
      "design": "The controller keeps connection lifecycle and message serialization in one focused networking layer. RakNet provides the third-party transport; the project adds application-level setup and message handling.",
      "links": [
        {
          "url": "https://github.com/Lethache/RakNet",
          "label": "Private repository",
          "private": true
        }
      ],
      "technical": true,
      "subtitle": "Reliable ordered messages & connection lifecycle"
    },
    {
      "id": "udp-winforms",
      "category": "C#",
      "title": "UDPClientServer",
      "kind": "Networking · Coursework",
      "featured": false,
      "status": "Course project · Private source",
      "stack": "C# · UDP sockets · Windows Forms",
      "summary": "Asynchronous UDP text messaging with separate client / server forms and a synchronized queue.",
      "description": "A C# Windows Forms prototype for exchanging text messages over UDP. Separate client and server windows use a shared UDP controller to receive datagrams asynchronously and queue messages for application processing.",
      "contributions": [
        "Implemented socket receive callbacks using BeginReceiveFrom and EndReceiveFrom.",
        "Protected the received-message queue with lock while callbacks and the application consume shared state.",
        "Connected UDPController.cs to separate FormClient and FormServer interfaces."
      ],
      "note": "A UDP text-message prototype. Reliable delivery and full multiplayer gameplay are not part of this exercise.",
      "source": "",
      "demo": "",
      "design": "Receiving a datagram and updating application state happen on different execution paths. A lock-protected queue provides a clear handoff between those paths.",
      "links": [
        {
          "url": "https://github.com/Lethache/UDPClientServer",
          "label": "Private repository",
          "private": true
        }
      ],
      "technical": true,
      "subtitle": "Asynchronous datagrams & synchronized queues"
    },
    {
      "id": "sdl-tag",
      "category": "C++",
      "title": "SDLTagYouAreIt",
      "kind": "Gameplay systems · Coursework",
      "featured": false,
      "status": "Public source",
      "stack": "C++ · SDL3",
      "summary": "An SDL3 tag game with frame-rate-independent movement, seek / flee NPCs, and binary state saves.",
      "description": "A small C++ tag game where the player moves with the arrow keys, approaches animated NPCs, and tags them through collision. NPCs switch between seeking and fleeing based on distance, with sound and counters making each tag visible to the player.",
      "contributions": [
        "Player.cpp normalizes movement input and scales displacement by deltaTime, avoiding faster diagonal movement and frame-dependent speed.",
        "NPC.cpp uses distance bands for seek / flee behavior and selects idle, run, or death sprite animation from the current state.",
        "Level.cpp coordinates collision-based tag detection, audio feedback, and tag counters.",
        "ObjectPool.h reuses objects; the save / load path writes and restores player and NPC state in a binary format."
      ],
      "note": "C++ / SDL3 coursework. The public repository contains the implementation, including Player.cpp, NPC.cpp, and ObjectPool.h.",
      "source": "https://github.com/Lethache/SDLTagYouAreIt",
      "demo": "",
      "design": "Input, behavior, animation, and level interactions are separated into player, NPC, and level code. This makes the project a compact example of a complete gameplay update loop rather than an isolated movement demo.",
      "links": [
        {
          "url": "https://github.com/Lethache/SDLTagYouAreIt",
          "label": "Source on GitHub",
          "private": false
        }
      ],
      "technical": true,
      "subtitle": "Tag gameplay, NPC behavior & object reuse"
    },
    {
      "id": "sdl-levels",
      "category": "C++",
      "title": "SDLLevels",
      "kind": "Game loop & state · Coursework",
      "featured": false,
      "status": "Public source",
      "stack": "C++ · SDL3 · Binary serialization",
      "summary": "Ten animated warriors, speed-dependent animation, two levels, and binary autosave / load.",
      "description": "A C++ / SDL3 project with ten animated warriors moving at randomized speeds through a two-level game loop. Animation rate follows movement speed; obstacles and collisions introduce character death and removal, while level transitions and binary saves preserve the game state.",
      "contributions": [
        "Created ten warrior instances with randomized movement speeds and animation rates derived from those speeds.",
        "Implemented falling obstacles, collision handling, and character death / removal.",
        "Added level transition behavior when a warrior exits the screen.",
        "Implemented binary autosave and load so level state can be restored."
      ],
      "note": "C++ / SDL3 coursework. Level1.cpp is a useful entry point for reviewing the multi-character update loop.",
      "source": "https://github.com/Lethache/SDLLevels",
      "demo": "",
      "design": "Movement speed and animation speed share the same character state, keeping visual feedback consistent. Level logic coordinates character lifetime, transitions, and persistence.",
      "links": [
        {
          "url": "https://github.com/Lethache/SDLLevels",
          "label": "Source on GitHub",
          "private": false
        }
      ],
      "technical": true,
      "subtitle": "Animated characters, level state & persistence"
    },
    {
      "id": "sdl-chunks",
      "category": "C++",
      "title": "SDLFileChunks",
      "kind": "Tools & design patterns · Coursework",
      "featured": false,
      "status": "Public source",
      "stack": "C++ · SDL3 · Command pattern",
      "summary": "Reconstructing TGA image data from binary chunks, with reversible command-based operations.",
      "description": "A C++ / SDL3 tools exercise that assembles an image buffer from structured file chunks and reconstructs TGA data. Editing operations are represented as commands so they can be undone and redone.",
      "contributions": [
        "Implemented chunk-to-image-buffer operations in ImageBufferCommands.h.",
        "Used AssembleChunksCommand to reconstruct binary TGA image data from file chunks.",
        "Managed reversible operations through separate undo and redo command stacks in CommandManager.cpp."
      ],
      "note": "Public C++ / SDL3 coursework. The repository’s default branch is lab5.part8.",
      "source": "https://github.com/Lethache/SDLFileChunks",
      "demo": "",
      "design": "The command pattern gives each operation an explicit execution and reversal path. Command history is independent of the image-buffer data it modifies.",
      "links": [
        {
          "url": "https://github.com/Lethache/SDLFileChunks",
          "label": "Source on GitHub",
          "private": false
        }
      ],
      "technical": true,
      "subtitle": "Image reconstruction & command-based Undo / Redo"
    }
  ]
};
