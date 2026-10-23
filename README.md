# Cinematic AI Video Editor Portfolio

A complete, responsive one-page portfolio built with **HTML, CSS and vanilla JavaScript**. No frameworks, npm, Node, subscriptions, databases or build commands are required.

The package uses professional-looking, AI-recreated portraits based on your supplied reference photo. The project gallery contains **clearly labeled concept placeholders** until you replace them with footage and stills you have permission to share. It does not invent past clients, awards, performance metrics or project outcomes.

## Open it

1. Extract the ZIP file to a folder on your computer.
2. Open **index.html** in Chrome, Edge, Firefox or Safari.
3. The website is ready to navigate. It works offline; online fonts and embedded YouTube/Vimeo videos require internet access.

## Personalize it — edit only `script.js`

At the very top of `script.js`, find `const SETTINGS = { ... }`.

| Field | What to enter |
| --- | --- |
| `name` | Your public display name. It updates the navigation, About section, footer and browser title. |
| `email` | Your REAL email address. Required to activate the email/contact form. |
| `location` | Your location or “Available worldwide”. |
| `heroKicker` | Your short job-title line. |
| `showreelUrl` | URL of your showreel, or `assets/showreel.mp4` if stored locally. |
| `projects` | Update titles, categories, short descriptions, cover images, video URLs, tags and detail copy. |

### Add real portfolio videos

Each project has the following editable properties in `script.js`:

```js
{
  id: 'my-brand-film',            // unique slug
  title: 'My Brand Film',
  category: 'commercial',        // ai, commercial, or social
  categoryLabel: 'COMMERCIAL / BRAND FILM',
  description: 'A one-sentence project description.',
  image: 'assets/my-brand-film.jpg',
  videos: [
    { url: 'assets/my-brand-film.mp4', label: 'MAIN FILM' }
  ],
  tags: ['EDITING', 'COLOR', 'STORYTELLING'],
  detail: 'What you made, what you contributed, and the result.'
}
```

**Supported video locations:**
- YouTube URLs (`youtu.be/...`, `youtube.com/watch?v=...`, or YouTube Shorts)
- Vimeo links (`vimeo.com/123456789`)
- Direct video files: URLs ending in `.mp4`, `.mov`, `.webm` or `.ogg`
- Files inside the portfolio folder, such as `assets/my-edit.mp4`
- Other valid links open in a separate tab rather than being embedded

The showcase currently contains two projects: **Cinematic AI Drama** has `AI SAMPLE 1.mov`, `AI SAMPLE 2.mov`, and `AI SAMPLE 3 .mp4`; **Product Films** has `PRODUCT SAMPLE 1.mp4`, `PRODUCT SAMPLE 2.mp4`, and `PRODUCT SAMPLE 3.mp4`. Each gallery card uses a still frame from its first sample and stays silent; every video in a project's playlist has its own frame thumbnail. Add clips and their `image` thumbnail paths to a project's `videos` list in `script.js`. Portrait videos keep their 9:16 shape in the player. Video preview depends on the browser and the video's codec. Exporting as MP4 (H.264) provides broader browser compatibility.

The index cards use frame captures from the first AI and product sample videos. To change a card's thumbnail, put a JPG or WEBP in `/assets` and update that project's `image` value.

### Replace the portraits

Use your own approved photographs or rendered images by replacing any of these files in `assets/` while keeping the names:

- `hero-portrait.webp` — cover portrait
- `thoughtful-editor.webp` — process tab 1
- `camera-editor.webp` — process tab 2 and About section
- `working-editor.webp` — process tab 3 and color-look demonstration
- `client-editor.webp` — process tab 4

Use similar aspect ratios to maintain the layout. The color-look slider is an interactive **CSS demonstration**, not an original-versus-final video grade of a real client deliverable.

## Working features

- Cinematic responsive hero with your portrait
- Mobile hamburger navigation
- Filterable project gallery (`All`, `AI films`, `Commercials`, `Social edits`)
- Video showcase with a selectable playlist, working video embeds and Escape-to-close
- Showreel video viewer
- Four-step interactive editing workflow
- Before/after color-look demo slider
- Scroll progress indicator, subtle animations, hover effects and motion-reduction support
- Keyboard navigation and readable focus styles
- Contact form that opens a **pre-filled draft in the visitor's email application**

**Important:** This form does **not** transmit or store messages itself. To receive inquiries, first set `SETTINGS.email`, and visitors must send the resulting email from their own mail application. A server-side form service would be needed for direct website submissions.

## Publish it online

Any static website host works: GitHub Pages, Netlify, Cloudflare Pages or your own web host. Upload the entire folder so `index.html`, `style.css`, `script.js` and `assets/` stay in their original relative positions. No special server configuration is required.

The `.mov` and `.mp4` files in this project are tracked with Git LFS so they can be stored in GitHub without exceeding Git's per-file size limit. Install Git LFS before cloning or pushing this repository; LFS storage and bandwidth quotas may apply.

## Files

```text
cinematic_editor_portfolio/
  index.html                 page structure
  style.css                  typography, colors, layouts, animation, mobile rules
  script.js                  PERSONAL DETAILS and INTERACTIONS
  README.md                  setup guide
  assets/
    hero-portrait.webp
    working-editor.webp
    thoughtful-editor.webp
    camera-editor.webp
    client-editor.webp
    ai-sample-preview.jpg
    ai-sample-1-thumb.jpg
    ai-sample-2-thumb.jpg
    ai-sample-3-thumb.jpg
    product-sample-preview.jpg
    product-sample-1-thumb.jpg
    product-sample-2-thumb.jpg
    product-sample-3-thumb.jpg
    AI SAMPLE 1.mov
    AI SAMPLE 2.mov
    AI SAMPLE 3 .mp4
    PRODUCT SAMPLE 1.mp4
    PRODUCT SAMPLE 2.mp4
    PRODUCT SAMPLE 3.mp4
    film-*.svg               sample project art
    favicon.svg
```

Everything can be customized. If you want a different accent color, edit `--lime` in the `:root` block near the top of `style.css`.
