# Color Duet Studio

Color Duet Studio is a Vite, React, and TypeScript website for browsing curated two-color pairings. It helps designers scan, filter, inspect, and copy color values for visual design work.

## Features

- Browse 60 curated two-color combinations in a responsive gallery.
- Search by color name, HEX value, type, score, or rank.
- Filter by pairing type:
  - Light + deep anchor
  - Soft complementary
  - Split-complement pastel
- Sort by rank, score, or type.
- Select a pair to inspect a larger swatch, score, type, HEX values, and RGB values.
- Copy individual HEX/RGB values or the full selected pair.
- Use the site on mobile, tablet, and desktop layouts.

## Tech Stack

- React 19
- TypeScript
- Vite
- CSS
- Lucide React icons

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173/
```

## Available Scripts

```bash
npm run dev
```

Runs the Vite development server.

```bash
npm run build
```

Builds the production site with TypeScript checks.

```bash
npm run lint
```

Runs ESLint across the project.

```bash
npm run preview
```

Serves the production build locally.

## Project Structure

```text
src/
  App.tsx       Main gallery, filters, sorting, selection, and copy behavior
  App.css       Responsive layout and visual design
  index.css     Global font, base, and root styles
  main.tsx      React entry point
public/
  favicon.svg
  icons.svg
```

## Color Data

The gallery data is embedded in `src/App.tsx` as `COLOR_PAIRS`. The current dataset contains the 60 listed pairs from `complete_color_pairings_preview.md`.

Each pair includes:

- Rank
- Color A name and HEX
- Color B name and HEX
- Score
- Pairing type

## Design Notes

The interface uses neutral surfaces so the colors remain the focus. Cards include text labels for score, type, names, and HEX values, so the site does not rely on color alone to communicate meaning.

## Status

This project is a static frontend website. It has no backend, account system, or runtime data fetch.

## License

No license has been specified.
