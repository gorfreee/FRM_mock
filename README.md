# frm-prep-ui-lab

UI/UX mockup project for **FRM Prep Lab** — a web app to help candidates prepare for the FRM Part I exam (practice questions, quizzes, mock exams, performance tracking).

This repo is for **prototyping only**: key pages, layouts, UX flows, and static previews. No backend, auth, or database; all data is mock JSON.

## Tech stack

- **Framework:** SvelteKit  
- **Styling:** TailwindCSS  
- **Deploy:** Static build (Cloudflare Pages–compatible)

## Folder structure

```
frm-prep-ui-lab/
├── src/
│   ├── app.html               # HTML shell
│   ├── app.css                # Tailwind directives
│   ├── app.d.ts
│   ├── lib/
│   │   ├── components/        # Reusable UI (Layout, Sidebar)
│   │   │   ├── Layout.svelte
│   │   │   └── Sidebar.svelte
│   │   └── data/              # Mock JSON
│   │       └── quiz-result.json
│   └── routes/
│       ├── +layout.svelte     # Root layout (imports app.css)
│       ├── +layout.ts         # prerender = true
│       ├── +page.svelte       # Dashboard/home
│       └── quiz-result/
│           ├── +page.svelte   # Quiz result mockup
│           └── +page.ts       # Loads mock data
├── static/                    # Static assets (e.g. favicon.svg)
├── svelte.config.js           # adapter-static
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Use the sidebar to open **Quiz result** (`/quiz-result`).

## Build (static)

```bash
npm run build
```

Output is in the `build/` directory. Preview it:

```bash
npm run preview
```

## Deploy to GitHub Pages

1. Push this repo to GitHub (see steps in the guide below).
2. In the repo on GitHub: **Settings** → **Pages** → under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to the `main` branch (or run the workflow manually). The **Deploy to GitHub Pages** workflow will build and deploy.
4. The site will be at `https://<your-username>.github.io/<repo-name>/`.

## Deploy to Cloudflare Pages

### Option A: Git + Cloudflare dashboard

1. Push this repo to GitHub (or GitLab).
2. In [Cloudflare Dashboard](https://dash.cloudflare.com) → **Pages** → **Create a project** → **Connect to Git**.
3. Select the repo and configure:
   - **Build command:** `npm run build`
   - **Build output directory:** `build`
   - **Root directory:** (leave blank if repo root is the project)
4. Deploy. Cloudflare will build and serve the static site.

### Option B: Wrangler CLI

1. Install Wrangler: `npm i -g wrangler`
2. From the project root, after building:

   ```bash
   npm run build
   npx wrangler pages deploy build --project-name frm-prep-ui-lab
   ```

3. Follow the prompts to log in and create/link the Pages project.

### Note

- The app uses **client-side routing**. If you use **adapter-static** with no `fallback`, direct visits to routes like `/quiz-result` work because every route is prerendered as its own file (e.g. `quiz-result/index.html`). No extra Cloudflare config is required for that.

You now have a clean, minimal mockup base. Add new pages under `src/routes/` and new mock data under `src/lib/data/` as needed.
