# Dropdown from Hell

A tiny "Worst UX Olympics" challenge for team competitions.

## Challenge

Select the target year as quickly as possible from a dropdown containing every year from 1900 through 2026.

The UX crime: the values are sorted alphabetically as text instead of numerically, and keyboard jumping/navigation is disabled.

## Run locally

Open `index.html` in a browser.

For a small local web server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Host on GitHub Pages

1. Create a GitHub repository.
2. Upload `index.html`, `style.css`, and `script.js` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select your main branch and `/ (root)`.
6. Save. GitHub will provide the public URL.

## Customize

Edit these constants at the top of `script.js`:

```js
const MIN_YEAR = 1900;
const MAX_YEAR = 2026;
const TARGET_YEAR = 1987;
```
