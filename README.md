# MattCarolan.com

Personal portfolio for Matt Carolan, built with Next.js and published to GitHub Pages.

## Develop and build

- Run `npm ci` and `npm run dev`.
- Run `npm run build` for the static export in `out/`.
- Pushes to `main` run the existing GitHub Pages deployment workflow.

## Artwork and design

The original `public/1.jpeg` is reused without redrawing or stretching the character. An SVG clip animates the right foot. A small canvas maps the original fabric onto two narrow, hard-clipped strips along the jacket's outer edges. Gentle horizontal gusts and a trailing flutter settle back to the still image. The canvas ends above the trousers, and its fixed output mask excludes the center of the body. The face, arms, waistband and trousers are never animated. Animation pauses off screen and in background tabs; reduced-motion preferences show the unchanged still image. Keep the original file and its 16:9 aspect ratio.

The book uses the supplied front cover at `public/assets/book-cover.jpg`, with a CSS spine. No page block is shown. Brookfield uses the supplied white wordmark on a blue square at `public/assets/brookfield.png`.

## Contact form

All email icons, the right-side address, Get In Touch and Say Hello open one native dialog. Submissions use FormSubmit's AJAX endpoint for `matt@mattcarolan.net`, with required fields, a honeypot, timeout, and success/error feedback. Visitors do not need an email client.

FormSubmit may require recipient activation. Verify activation and an actual received submission before treating email delivery as confirmed. Browser QA checks the dialog and validation without sending test mail.

## November 2026 implementation

Updated experience descriptions, consistent horizontal company headers, North America AWS recognition, Vancouver user group dates and founder/organizer/speaker roles, AWS Summit Toronto and other speaking engagements, WhatsApp links, book presentation, hero spacing and mobile navigation.
