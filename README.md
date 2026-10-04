# Muhammad Bilal Portfolio

## Local development

Install dependencies once, then start the development server:

```powershell
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:3000/`. Changes refresh automatically after saving.

## Production check

```powershell
npm.cmd run check
npm.cmd run build
npm.cmd run preview
```

Open `http://localhost:4173/` to review the production build.

## Review and client logo assets

Add client logo images to `client/src/assets/logos/` and review screenshots to `client/src/assets/reviews/`. Supported formats are PNG, JPG/JPEG, WebP, and SVG for logos; review screenshots support PNG, JPG/JPEG, and WebP.

For logos, prefix the company name with its two-letter ISO country code and a hyphen. For example, `us-acme-corp.png` displays the company as “Acme Corp” with a United States flag, while `dk-omni-consulting.jpg` displays “Omni Consulting” with a Denmark flag. The country name is derived from the code and the matching flag is loaded from `client/src/assets/flags/<code>.svg`. Flag files already included are `de.svg`, `dk.svg`, `gb.svg`, and `us.svg`; to use another country code, add its lowercase two-letter SVG flag to that folder. Logo files without a valid country-code prefix and matching flag are still displayed, but without a country flag or label.

For review screenshots, use the client name as the filename, such as `jane-doe.png`. Filenames become displayed names, with hyphens and underscores converted to spaces. The Vite asset glob discovers files in these folders automatically, so adding or removing an image updates the development site and the next production build without editing a list of image paths.

## Vercel deployment

Import this GitHub repository into Vercel. The included `vercel.json` selects the Vite preset, runs `npm run build`, and deploys the generated `dist` folder. No server or environment variables are required for the current portfolio.
