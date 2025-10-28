ZistPlus - Web Preview (Final)

This is a lightweight, minimal, and stable web-preview of ZistPlus built with Next.js 14 (App Router).

How to run locally:
1. Extract ZIP to a folder.
2. Put Vazirmatn font files into public/fonts/Vazirmatn/: Vazirmatn-Regular.woff2 and Vazirmatn-Bold.woff2. Alternatively system will fall back to system font.
3. (Optional) Replace public/icons/logo.svg and public/icons/banks/*.svg with official logos.
4. Run:
   npm install
   npm run dev
5. Open http://localhost:3000

Notes:
- Uses native date/time inputs to avoid fragile external date-picker dependencies.
- Data is stored in localStorage.
- Splash displays on first run.
- If port 3000 is busy, run `npm run dev -- -p 3001` or free the port.
