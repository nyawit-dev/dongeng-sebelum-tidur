<script lang="ts">
  import { base } from '$app/paths';
  import episodes from '$lib/data/episodes.json';
  import characters from '$lib/data/characters.json';

  type Episode = (typeof episodes)[number];

  function seasonClass(season: number): string {
    if (season === 2) return 'bg-forest';
    if (season === 3) return 'bg-plum';
    return 'bg-brick';
  }
  function seasonLabel(season: number): string {
    if (season === 2) return 'Musim 2 · hijau hutan';
    if (season === 3) return 'Musim 3 · ungu tua';
    return 'Musim 1 · merah bata';
  }
  function catalogNo(ep: Episode): string {
    return `ep.${String(ep.episode).padStart(2, '0')}`;
  }

  const seasons = [...new Map(episodes.map((e) => [e.season, e.seasonTitle])).entries()].map(
    ([season, seasonTitle]) => ({
      season,
      seasonTitle,
      items: episodes.filter((e) => e.season === season)
    })
  );

  const latest = [...episodes].slice(-3).reverse();
  const shelfBooks = episodes.slice(0, 12);
</script>

<svelte:head>
  <title>Dongeng Sebelum Tidur — Perpustakaan Novel Satir</title>
  <meta name="description" content="Masuk ruang baca Perpustakaan Dongeng Sebelum Tidur: jelajahi rak-rak episode novel satir, pinjam cerita per musim, dan kenali katalog tokohnya." />
  <meta property="og:title" content="Dongeng Sebelum Tidur — Perpustakaan Novel Satir" />
  <meta property="og:description" content="Rak buku novel satir episodik Dongeng Sebelum Tidur — tumpeng satir fiktif ke kebijakan dan praktik pemerintah Indonesia. Baca per musim, mulai dari rak pertama." />
  <meta property="og:url" content="https://nyawit-dev.github.io/dongeng-sebelum-tidur/" />
</svelte:head>

<!-- HERO: big bookshelf -->
<section class="mx-auto max-w-6xl px-5 pt-10">
  <div class="library-hall p-6 md:p-10">
    <p class="font-display text-xs font-bold uppercase tracking-[0.25em] text-sea">Ruang baca utama &middot; selamat datang</p>
    <h1 class="font-display font-bold tracking-tight text-4xl md:text-6xl leading-[1.05] mt-3">
      Dongeng Sebelum Tidur,<br /><span class="text-crimson">novel satir episodik di rak perpustakaan.</span>
    </h1>
    <p class="mt-4 max-w-2xl text-lg">
      Ambil satu buku dari rak, buka halamannya, dan baca tumpeng satir fiktif ke kebijakan dan praktik pemerintah Indonesia — satu episode, satu musim, satu katalog dalam sekali duduk.
    </p>
    <div class="mt-6 flex flex-wrap gap-3">
      <a href="{base}/cerita/" class="font-display font-bold bg-ink text-paper px-5 py-3 border-2 border-ink shadow-[5px_5px_0_#b91c1c] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#b91c1c]">Masuk rak cerita →</a>
      <a href="{base}/tentang/" class="font-display font-bold bg-paper px-5 py-3 border-2 border-ink">Cara membaca</a>
    </div>

    <!-- Bookshelf row: spines -->
    <div class="mt-10">
      <div class="flex items-end gap-2 overflow-x-auto pb-1 px-1" aria-label="Jajaran buku episode di rak">
        {#each shelfBooks as ep}
          <a
            href="{base}/cerita/{ep.slug}/"
            class="book-spine {seasonClass(ep.season)} shrink-0 flex flex-col items-center justify-between w-12 md:w-14 py-3 no-underline"
            style="height: {150 + (ep.title.length % 5) * 12}px"
            title="{catalogNo(ep)} — {ep.title}"
          >
            <span class="font-display text-[10px] font-bold tracking-widest">{catalogNo(ep)}</span>
            <span class="font-display font-bold text-sm leading-tight text-center px-1">{ep.title}</span>
            <span class="text-[10px] opacity-90">Musim {ep.season}</span>
          </a>
        {/each}
      </div>
      <div class="shelf-plank mt-0" aria-hidden="true"></div>
      <p class="mt-2 text-xs uppercase tracking-widest text-ink/60">Rak A · jajaran punggung buku per episode · warna = musim</p>
    </div>
  </div>
</section>

<!-- STATS: library desk cards -->
<section class="mx-auto max-w-6xl px-5 mt-10">
  <div class="grid grid-cols-3 gap-4">
    <div class="catalog-card p-5 text-center">
      <p class="font-display text-4xl md:text-5xl font-bold text-crimson">{episodes.length}</p>
      <p class="mt-1 text-sm uppercase tracking-widest">Episode di rak</p>
    </div>
    <div class="catalog-card p-5 text-center">
      <p class="font-display text-4xl md:text-5xl font-bold text-forest">{seasons.length}</p>
      <p class="mt-1 text-sm uppercase tracking-widest">Musim / rak</p>
    </div>
    <div class="catalog-card p-5 text-center">
      <p class="font-display text-4xl md:text-5xl font-bold text-plum">{characters.length}</p>
      <p class="mt-1 text-sm uppercase tracking-widest">Tokoh katalog</p>
    </div>
  </div>
</section>

<!-- FEATURED: latest 3 as book covers -->
<section class="mx-auto max-w-6xl px-5 mt-12">
  <div class="flex items-end justify-between gap-4 flex-wrap">
    <h2 class="font-display font-bold text-2xl md:text-3xl">Baru dipinjam — episode terbaru</h2>
    <a href="{base}/cerita/" class="font-display font-semibold underline decoration-crimson decoration-2">Lihat semua rak →</a>
  </div>
  <div class="grid gap-6 md:grid-cols-3 mt-6">
    {#each latest as ep}
      <a href="{base}/cerita/{ep.slug}/" class="group block no-underline">
        <div class="{seasonClass(ep.season)} text-white border-2 border-ink shadow-[7px_7px_0_#1a1611] p-6 min-h-56 flex flex-col justify-between group-hover:-translate-y-1 transition-transform">
          <div class="flex justify-between font-display text-xs font-bold uppercase tracking-widest">
            <span>{catalogNo(ep)}</span><span>{seasonLabel(ep.season)}</span>
          </div>
          <div>
            <h3 class="font-display font-bold text-2xl leading-tight">{ep.title}</h3>
            <p class="mt-3 text-white/90 line-clamp-3">{ep.excerpt}</p>
          </div>
          <p class="font-display text-xs mt-4">{ep.readingMinutes} menit baca · {ep.theme}</p>
        </div>
      </a>
    {/each}
  </div>
</section>

<!-- ARCS: shelf rows per season -->
<section class="mx-auto max-w-6xl px-5 mt-14">
  <h2 class="font-display font-bold text-2xl md:text-3xl">Denah rak — alur per musim</h2>
  <div class="mt-6 space-y-8">
    {#each seasons as s}
      <div>
        <div class="shelf-label inline-block px-4 py-2 font-bold">
          Rak {s.season} — {s.seasonTitle} <span class="opacity-80 font-normal">({s.items.length} buku)</span>
        </div>
        <div class="flex items-end gap-3 overflow-x-auto mt-4 pb-1">
          {#each s.items as ep}
            <a href="{base}/cerita/{ep.slug}/" class="book-spine {seasonClass(ep.season)} shrink-0 w-11 py-3 no-underline" style="height: {130 + (ep.title.length % 4) * 10}px" title="{ep.title}">
              <span class="font-display text-[10px] font-bold">{catalogNo(ep)}</span>
              <span class="font-display font-bold text-xs text-center px-1">{ep.title}</span>
            </a>
          {/each}
        </div>
        <div class="shelf-plank" aria-hidden="true"></div>
        <p class="mt-2 text-sm text-ink/75">Mulai dari <a class="underline font-semibold" href="{base}/cerita/{s.items[0].slug}/">{catalogNo(s.items[0])} {s.items[0].title}</a> di rak ini.</p>
      </div>
    {/each}
  </div>
</section>
