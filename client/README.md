<![CDATA[<div align="center">

# 🏁 Windows XP Portfolio

**A nostalgic, interactive developer portfolio disguised as a fully functional Windows XP desktop.**

Built with React + TypeScript + Framer Motion

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-blue?style=for-the-badge)](https://your-deployment-url.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Kidrah--kun-181717?style=for-the-badge&logo=github)](https://github.com/Kidrah-kun)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Hardik_Hathwal-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/hardik-hathwal-5098b2316/)

</div>

---

## ✨ Features

### 🖥️ Desktop Experience (> 768px)
- **Authentic Windows XP UI** — Bliss wallpaper, draggable windows, taskbar, Start menu
- **Retro Boot Sequence** — BIOS POST screen → XP loading with flag logo → Welcome screen
- **Draggable & Resizable Windows** — Minimize, maximize, and close with XP-style controls
- **Interactive Start Menu** — Click-to-open with profile header and app launcher
- **Desktop Widgets** — Live analog clock, dev quote rotator
- **Right-Click Context Menu** — Refresh, open terminal, view properties
- **CRT Scanline Overlay** — Subtle retro screen effect

### 📱 Mobile Experience (< 768px)
- **Android-Inspired Shell** — Status bar, 3-button nav, swipe gestures
- **Home Screen** — Clock widget, profile card with social links, quick-access app grid
- **App Drawer** — Swipe up to see all apps in a full-screen overlay
- **Full-Screen Apps** — Each section opens as a full-screen app with XP-styled title bar

### 📂 Sections / "Windows"

| Window | Description |
|--------|-------------|
| **About Me** | Bio, education, interests (painting, guitar, open-source) |
| **Tech Stack** | Skills grid with animated proficiency bars — JS, React, Node, Python, MongoDB, etc. |
| **My Projects** | Project cards with **real screenshots** as backgrounds, live demo + GitHub links |
| **Resume** | Formatted resume view styled as a Notepad document |
| **Contact** | Outlook Express-themed email form + social links |
| **Terminal** | Functional command prompt with `help`, `neofetch`, `projects`, `contact`, and Easter eggs |

### 🎮 Terminal Commands
```
> help          — List all available commands
> neofetch      — Display system info with ASCII art
> about         — About the developer
> skills        — List technical skills
> projects      — Browse projects
> contact       — Show contact info
> clear         — Clear terminal
> hire hardik   — 🎉 Easter egg!
```

---

## 🚀 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite |
| **Animations** | Framer Motion |
| **Styling** | Tailwind CSS + Custom XP Theme CSS |
| **Icons** | Lucide React |
| **Routing** | React Router v6 |
| **UI Components** | Radix UI Primitives |

---

## 📁 Project Structure

```
client/
├── public/
│   └── projects/              # Project screenshots (used as card backgrounds)
│       ├── anime-interview.png
│       ├── library-management.png
│       └── finance-management.png
├── src/
│   ├── assets/                # XP wallpaper, fonts
│   ├── components/
│   │   ├── BootScreen.tsx     # BIOS → XP boot → Welcome animation
│   │   ├── Taskbar.tsx        # Bottom taskbar with Start button & system tray
│   │   ├── StartMenu.tsx      # XP Start menu with profile & app list
│   │   ├── XPWindow.tsx       # Draggable, resizable window component
│   │   ├── DesktopIcon.tsx    # Desktop shortcut icons
│   │   ├── DesktopWidget.tsx  # Clock + quote widget
│   │   ├── ContextMenu.tsx    # Right-click context menu
│   │   ├── MobileShell.tsx    # Android-style mobile layout
│   │   ├── WindowsLogo.tsx    # XP flag logo SVG component
│   │   └── windows/
│   │       ├── AboutContent.tsx
│   │       ├── TechStackContent.tsx
│   │       ├── ProjectsContent.tsx
│   │       ├── ResumeContent.tsx
│   │       ├── ContactContent.tsx
│   │       └── TerminalContent.tsx
│   ├── hooks/
│   │   └── use-mobile.tsx     # Mobile breakpoint detection
│   └── pages/
│       └── Index.tsx          # Main page — routes mobile vs desktop
└── package.json
```

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/Kidrah-kun/Windows_Portfolio.git
cd Windows_Portfolio/client

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be running at **http://localhost:8080**

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🌐 Deployment

This is a **static frontend** — no backend required. Deploy to any static hosting:

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Drag & drop the `dist/` folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Push `dist/` to gh-pages branch
```

---

## 🎨 Customization

### Change Personal Info
All text content is **hardcoded in the component files** under `src/components/windows/`. Edit these files to personalize:

- **Name & Bio** → `AboutContent.tsx`
- **Skills** → `TechStackContent.tsx`
- **Projects** → `ProjectsContent.tsx`
- **Resume** → `ResumeContent.tsx`
- **Social Links** → `ContactContent.tsx`, `StartMenu.tsx`, `TerminalContent.tsx`

### Add Project Screenshots
1. Place screenshots in `public/projects/`
2. Reference them in `ProjectsContent.tsx` via the `screenshot` field:
```tsx
{ id: "my-project", screenshot: "/projects/my-project.png", ... }
```

### Change Wallpaper
Replace `src/assets/xp-bliss.jpg` with your preferred wallpaper image.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Made with ❤️ and nostalgia by [Hardik Hathwal](https://github.com/Kidrah-kun)**

*"Windows XP never dies — it just gets reborn as a portfolio."*

</div>
]]>
