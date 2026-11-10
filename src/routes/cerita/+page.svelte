<script lang="ts">
  import { base } from '$app/paths';
  import episodes from '$lib/data/episodes.json';

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
    const map = new Map<number, { season: number; seasonTitle: string; items: typeof episodes }>();
    for (const e of filtered) {
      if (!map.has(e.season)) map.set(e.season, { season: e.season, seasonTitle: e.seasonTitle, items: [] });
      map.get(e.season)!.items.push(e);
    }
    return [...map.values()];
  });

  const count = $derived(grouped.reduce((n, g) => n + g.items.length, 0));
</script>

<svelte:head>
  <title>Rak Cerita — Dongeng Sebelum Tidur</title>
  <meta name="description" content="10 episode per musim, tersusun di rak. Cari lewat katalog." />
  <meta property="og:title" content="Rak Cerita — Dongeng Sebelum Tidur" />
  <meta property="og:description" content="10 episode per musim, tersusun di rak. Cari lewat katalog." />
</svelte:head>

<section class="mx-auto max-w-2xl">
  <p class="text-crimson text-sm font-semibold uppercase tracking-widest">Katalog rak</p>
  <h1 class="mt-2 font-display font-bold text-3xl leading-tight">Rak Cerita</h1>
  <p class="mt-3 text-ink/80 text-lg leading-relaxed">Setiap musim = satu rak. Cari judul, tema, atau kata kunci.</p>

  <div class="mt-4 flex flex-col gap-3 sm:flex-row">
    <label for="q" class="font-display font-bold text-sm w-full sm:w-auto">Cari:</label>
    <input id="q" type="search" bind:value={query} placeholder="mis. balai kota, banjir, musim 2…" class="border border-ink/20 px-4 py-2 font-serif focus:border-crimson focus:outline-none" />
    {#if query}
      <button onclick={() => (query = '')} class="border border-ink/20 px-4 py-2 font-display font-semibold text-crimson hover:text-white hover:bg-crimson">Bersihkan</button>
    {/if}
  </div>
  <p class="mt-3 text-sm text-ink/70">{count} buku ketemu{query ? ` untuk “${query}”` : ''}.</p>

  {#if grouped.length === 0}
    <p class="mt-6 text-center text-ink/60">Buku dengan kata kunci itu belum masuk rak. Coba kata lain, atau <a href="{base}/" class="text-crimson">kembali ke ruang baca</a>.</p>
  {:else}
    <ul class="mt-6 space-y-8">
      {#each grouped as g}
        <li class="border-l-2 border-ink/15 pl-4">
          <div class="flex items-baseline justify-between gap-3">
            <a href="{base}/cerita/{g.items[0].slug}/" class="font-display font-bold text-lg hover:text-crimson">{g.items[0].title}</a>
            <span class="text-xs text-ink/50">Rak {g.season} · {g.items.length} buku</span>
          </div>
          <p class="mt-1 text-sm text-ink/70">{g.items[0].excerpt}</p>
        </li>
      {/each}
    </ul>
  {/if}
</section>
