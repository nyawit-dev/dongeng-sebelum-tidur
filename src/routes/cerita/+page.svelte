<script lang="ts">
  import { base } from '$app/paths';
  import episodes from '$lib/data/episodes.json';

  type Episode = (typeof episodes)[number];

  function seasonClass(season: number): string {
    if (season === 2) return 'bg-forest';
    if (season === 3) return 'bg-plum';
    return 'bg-brick';
  }
  function catalogNo(ep: Episode): string {
    return `ep.${String(ep.episode).padStart(2, '0')}`;
  }

  let query = $state('');

  const grouped = $derived.by(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? episodes.filter(
          (e) =>
            e.title.toLowerCase().includes(q) ||
            e.excerpt.toLowerCase().includes(q) ||
            e.theme.toLowerCase().includes(q) ||
            e.seasonTitle.toLowerCase().includes(q)
        )
      : episodes;
    const map = new Map<number, { season: number; seasonTitle: string; items: Episode[] }>();
    for (const e of filtered) {
      if (!map.has(e.season)) map.set(e.season, { season: e.season, seasonTitle: e.seasonTitle, items: [] });
      map.get(e.season)!.items.push(e);
    }
    return [...map.values()];
  });
</script>

<svelte:head>
  <title>Rak Cerita — Dongeng Sebelum Tidur | Perpustakaan Novel Satir</title>
  <meta name="description" content="Jelajahi rak-rak per musim di Perpustakaan Dongeng Sebelum Tidur. Cari episode lewat katalog, filter judul, tema, dan musim." />
  <meta property="og:title" content="Rak Cerita — Dongeng Sebelum Tidur" />
  <meta property="og:description" content="Semua episode novel satir tersusun per rak musim, lengkap dengan pencarian katalog." />
</svelte:head>

<section class="mx-auto max-w-6xl px-5 pt-10">
  <p class="font-display text-xs font-bold uppercase tracking-[0.25em] text-sea">Katalog pencarian</p>
  <h1 class="font-display font-bold tracking-tight text-4xl md:text-5xl mt-2">Rak Cerita</h1>
  <p class="mt-3 max-w-2xl">Setiap musim adalah satu rak. Cari judul, tema, atau kata kunci — pustakawan akan menunjukkan buku yang cocok.</p>

  <div class="catalog-card mt-6 p-4 flex flex-col md:flex-row gap-3 md:items-center">
    <label for="q" class="font-display font-bold text-sm shrink-0">Cari di katalog:</label>
    <input
      id="q"
      type="search"
      bind:value={query}
      placeholder="mis. balai kota, banjir, musim 2…"
      class="w-full border-2 border-ink bg-paper px-4 py-3 font-serif placeholder:text-ink/40"
    />
    {#if query}
      <button onclick={() => (query = '')} class="font-display font-bold border-2 border-ink bg-crimson text-white px-4 py-3 shrink-0">Bersihkan</button>
    {/if}
  </div>
  <p class="mt-3 text-sm text-ink/70" aria-live="polite">
    {grouped.reduce((n, g) => n + g.items.length, 0)} buku ketemu{query ? ` untuk “${query}”` : ''}.
  </p>

  {#if grouped.length === 0}
    <div class="page-sheet p-8 mt-8 text-center">
      <p class="stamp">Stempel: tidak ditemukan</p>
      <p class="mt-4">Buku dengan kata kunci itu belum masuk rak. Coba kata lain, atau <a class="underline font-semibold" href="{base}/">kembali ke ruang baca</a>.</p>
    </div>
  {:else}
    <div class="mt-10 space-y-12">
      {#each grouped as g}
        <section aria-label={g.seasonTitle}>
          <div class="shelf-label inline-block px-4 py-2 font-bold">
            Rak {g.season} — {g.seasonTitle} <span class="opacity-80 font-normal">· {g.items.length} buku</span>
          </div>
          <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3 mt-5">
            {#each g.items as ep}
              <a href="{base}/cerita/{ep.slug}/" class="group block no-underline">
                <div class="bg-white border-2 border-ink shadow-[6px_6px_0_#1a1611] overflow-hidden group-hover:-translate-y-1 transition-transform">
                  <div class="{seasonClass(ep.season)} text-white px-5 py-3 flex justify-between font-display text-xs font-bold uppercase tracking-widest">
                    <span>{catalogNo(ep)}</span><span>Rak {ep.season}</span>
                  </div>
                  <div class="p-5">
                    <h2 class="font-display font-bold text-xl leading-tight">{ep.title}</h2>
                    <p class="mt-2 text-sm text-ink/80 line-clamp-3">{ep.excerpt}</p>
                    <p class="mt-3 text-xs font-display uppercase tracking-widest text-sea">{ep.theme} · {ep.readingMinutes} menit</p>
                  </div>
                </div>
              </a>
            {/each}
          </div>
          <div class="shelf-plank mt-5" aria-hidden="true"></div>
        </section>
      {/each}
    </div>
  {/if}
</section>
