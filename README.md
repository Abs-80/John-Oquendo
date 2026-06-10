# John Oquendo — Fine Art & Photography Portfolio

An elegant, highly responsive, and minimalist interactive digital gallery crafted to showcase the legacy and portfolio of **John Oquendo**, a New York-based abstract expressionist painter and gelatin silver photographer.

This repository is calibrated to be production-ready and optimized for GitHub hosting, standard Vercel/Netlify deployment pipelines, or local containerization.

---

## 🎨 Design Philosophy & Concept

*   **Aesthetic Discipline**: Framed strictly using generous negative space, a warm archival paper background (`#FAF9F6`), and crisp editorial high-contrast typography pairing **Cinzel** (refined geometric display serif) with **Inter** and **JetBrains Mono**.
*   **Architectural Fluidity**: Replaces generic static column layouts with an organic, responsive masonry gallery column stack, resizing pictures seamlessly without breaking aspect ratios.
*   **Material Honesty**: Simulates canvas texture, silver gelatin mat frames, and natural illumination shadows dynamically rather than utilizing flat flat-color shapes.

---

## ✨ Key Feature Modules

1.  **Minimalist Editorial Catalog**: An immersive view of both abstract paintings series and high-contrast New York street nocturne photography. Features in-app search query filters and taxonomy categorization on the fly.
2.  **In Situ Virtual Hanging Wall**: An interactive staging module allowing collectors to preview pieces dynamically. Adjust:
    *   *Wall Colors*: Select from *Studio Cream*, *Gallery Charcoal*, *Contemporary Sage*, or *Brutalist Loft*.
    *   *Frame Castings*: Calibrate between *Frameless Canvas*, *Obsidian Aluminum*, *Natural White Oak*, and *Brushed Platinum*.
    *   *Archival Mats (Passepartout)*: Dynamic toggle applying realistic museum matting border margins.
    *   *Scaling reference*: Renders original dimensions visually relative to a detailed mid-century teak credenza credenza with plants and accessories.
3.  **Acquisition & Studio Inquiries**: Visitors can inspect artwork narratives and submit buy requests. Inquiries and bookmarks are persisted securely into your personal folder.
4.  **Visitor Register Ledger (Guestbook)**: A persistent guest register implemented with client-side state engines and `localStorage` caching to let collectors, friends, and co-travellers of art publish memories on the ledger roll.

---

## 🛠️ Technical Implementation Stack

*   **Runtime Core**: React 19 (Functional Hooks & Context)
*   **Build Bundler**: Vite 6+
*   **Type Safety**: TypeScript 5.8+ (Strict compiler resolution)
*   **Styling Engine**: Tailwind CSS v4 (Modern performance, native CSS configuration file, CSS custom variables)
*   **Interactive Motion**: Motion 12 (Custom spring physics for smooth in-out transitions and layout position keys)
*   **Utility Icons**: Lucide React

---

## 📂 Project Structure

```text
├── .env.example          # Environment variables specification
├── .gitignore            # GitHub standard exclusion file (node_modules, dist, etc.)
├── index.html            # Core entry point web page
├── metadata.json         # Platform capabilities profile
├── tsconfig.json         # TypeScript compiler rules configuration
├── vite.config.ts        # Vite configuration with aliases & disabled HMR setup
├── src/
│   ├── App.tsx           # Main application engine & section router
│   ├── index.css         # Import fonts, Tailwind CSS directives, and custom keyframes
│   ├── main.tsx          # React application lifecycle mounter
│   ├── types.ts          # Consolidated global TypeScript definitions
│   ├── data/
│   │   └── artworks.ts   # Core artwork models, descriptions, and artist biography
│   └── components/
│       ├── Header.tsx             # Sticky navigational masthead + inquiry micro-badge
│       ├── ArtworkGrid.tsx        # Search-enabled dynamic columns masonry showcase
│       ├── InSituView.tsx         # Virtual room simulator & frame customizer
│       ├── Biography.tsx          # Biographical narrative timeline & CV exhibition records
│       ├── Guestbook.tsx          # Persistent guest ledger sign-in scroll
│       ├── MyInquiries.tsx        # Personal curation folder containing saved pieces & inquiries
│       └── ArtworkDetailModal.tsx # Lightbox inspector modal with acquisition form
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites

*   **Node.js**: `v18.x` or higher
*   **npm**: `v9.x` or higher

### Installation

1. Clone the repository to your local computer:
   ```bash
   git clone https://github.com/your-username/john-oquendo-portfolio.git
   cd john-oquendo-portfolio
   ```

2. Install all required dependencies specified inside `package.json`:
   ```bash
   npm install
   ```

3. Populate your copy of local environment configurations:
   ```bash
   cp .env.example .env
   ```

### Execution Commands

*   **Start Local Development Server**:
    ```bash
    npm run dev
    ```
    This launches the local design playground at [http://localhost:3000](http://localhost:3000).

*   **Perform Source Code Linter Walk**:
    ```bash
    npm run lint
    ```

*   **Build Static Production Bundle**:
    ```bash
    npm run build
    ```
    This compiles type configurations and exports fully optimized, minified static HTML/CSS/JS building blocks into the `/dist` directory, fully prepared for quick zero-configuration deployment to GitHub Pages, Netlify, or Vercel.

---

## 📜 Intellectual Property & Copyrights

All painting canvases, graphite panel configurations, silver gelatin print exposures, and associated story narratives are intellectual creations of **John Oquendo**. Digital representation code in this repository is distributed and maintained with complete permission from the artist's estate and family.
