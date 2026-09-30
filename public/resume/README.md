# Resume

Drop the resume PDF in this directory using exactly this filename:

```
SRIJAN_RESUME.pdf
```

The full path must be `public/resume/SRIJAN_RESUME.pdf`, which Vite serves
at `/resume/SRIJAN_RESUME.pdf`. That URL is defined once, in
`src/data/site.js` as `site.resume`, and is the only place it appears.

Once the file is present, the **Resume** tile on the home page opens it in a
new tab, where the browser's built-in PDF viewer or download prompt handles
it. Nothing else needs to change.

The file is intentionally not committed here — it is a binary you will add
locally before pushing.