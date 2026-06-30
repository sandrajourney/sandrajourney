# Luxury Writing Room

Blog personal premium berbasis Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, MDX, dan `next-themes`.

## Cara menjalankan

1. Install dependency:

```bash
npm install
```

2. Jalankan mode pengembangan:

```bash
npm run dev
```

3. Buka `http://localhost:3000`.

## Menambah artikel

Tambahkan file `.mdx` baru ke `content/articles/`.

Contoh frontmatter:

```mdx
---
title: "Judul Artikel"
description: "Ringkasan singkat artikel."
slug: "judul-artikel"
cover: "https://images.unsplash.com/..."
author: "Sandra Puspita Sari"
category: "Writing"
tags: ["essay", "notes"]
publishedAt: "2026-06-29"
updatedAt: "2026-06-29"
featured: false
draft: false
---

Isi artikel di sini.
```

## Fitur utama

- Halaman home, blog, artikel, kategori, tag, pencarian, dan about.
- MDX dengan callout, kode, tabel, footnote, rumus matematika, audio, dan video embed.
- Dark mode/light mode dengan penyimpanan tema.
- Reading progress, table of contents, focus mode, pengaturan ukuran font dan lebar bacaan.
- Bookmark/favorite/recently read berbasis `localStorage`.
- SEO metadata, OpenGraph, sitemap, robots, RSS feed, manifest, dan service worker dasar.
