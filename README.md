# Dongeng Sebelum Tidur

Perpustakaan novel satir — **Dongeng Sebelum Tidur**: novel satir episodik (tumpeng satir fiktif ke kebijakan dan praktik pemerintah Indonesia), tampil sebagai ruang baca perpustakaan: rak buku per musim, kartu katalog episode, dan kartu anggota tokoh.

Live: https://nyawit-dev.github.io/dongeng-sebelum-tidur/

> **Disclaimer fiksi:** seluruh kota, tokoh, dan peristiwa adalah fiksi. Satire menargetkan kebijakan dan praktik pemerintah Indonesia, bukan individu nyata.

## Teknologi

- SvelteKit 2 + Svelte 5 (runes: `$props`, `$state`, `$derived`, `onclick`)
- Tailwind CSS 4 (`@tailwindcss/vite`)
- `@sveltejs/adapter-static` — prerender statis, `trailingSlash: 'always'`
- Font: Lora (serif isi) + Space Grotesk (display) via Google Fonts
- Palet kertas: paper `#f7f1e3`, ink `#1a1611`, crimson `#b91c1c`, teal `#0f766e`; warna rak per musim: Musim 1 merah bata `#8f2a1c`, Musim 2 hijau hutan `#1e4d2b`, Musim 3 ungu tua `#4a1d6b` — teks putih di atasnya kontras AA (lihat bawah).

## Pengembangan lokal

```bash
npm install
npm run dev
```

## Pemeriksaan & build

```bash
npm run check        # svelte-kit sync + svelte-check
npm run build        # vite build (prerender ke build/)
BASE_PATH=/dongeng-sebelum-tidur npm run build   # build untuk GitHub Pages project site
npm run check:build  # guard: build/index.html harus mereferensikan CSS
```

Data cerita (`src/lib/data/episodes.json`, `src/lib/data/characters.json`) adalah kontrak konten — jangan edit strukturnya tanpa memperbarui route yang mengimpornya.

## Deploy

Push ke `main` memicu GitHub Actions (`.github/workflows/deploy.yml`): `npm ci` → Check → Build (`BASE_PATH=/dongeng-sebelum-tidur`) → Verify build has CSS → deploy ke GitHub Pages.

## Kontras (WCAG AA, dihitung Python)

Rumus luminansi relatif WCAG 2.x, rasio = (L1+0.05)/(L2+0.05):

| Pasangan | Rasio | AA teks normal (≥4.5) |
|---|---|---|
| putih di atas crimson `#b91c1c` | 6.47 | ✅ |
| crimson di atas paper `#f7f1e3` | 5.74 | ✅ |
| ink di atas paper | 15.98 | ✅ |
| putih di atas teal `#0f766e` | 5.47 | ✅ |
| putih di atas Musim 1 `#8f2a1c` | 8.35 | ✅ |
| putih di atas Musim 2 `#1e4d2b` | 9.76 | ✅ |
| putih di atas Musim 3 `#4a1d6b` | 12.51 | ✅ |

## Lisensi

Kode: MIT. Konten cerita: fiksi untuk hiburan/satire.
