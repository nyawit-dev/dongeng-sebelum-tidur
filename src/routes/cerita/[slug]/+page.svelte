<script lang="ts">
  import { base } from '$app/paths';
  import episodes from '$lib/data/episodes.json';

  let { data } = $props();
  const ep = $derived(data.episode);
  const prev = $derived(data.prev);
  const next = $derived(data.next);

  function seasonClass(season: number): string {
    if (season === 2) return 'bg-forest';
    if (season === 3) return 'bg-plum';
    return 'bg-brick';
  }
  const catalogNo = $derived(`ep.${String(ep.episode).padStart(2, '0')}`);
</script>

<svelte:head>
  <title>{ep.title} ({catalogNo}) — Dongeng Sebelum Tidur</title>
  <meta name="description" content={ep.excerpt} />
  <meta property="og:title" content={`${ep.title} — Dongeng Sebelum Tidur`} />
  <meta property="og:description" content={ep.excerpt} />
  <meta property="og:type" content="article" />
</svelte:head>

<section class="mx-auto max-w-3xl px-5 pt-10">
  <a href="{base}/cerita/" class="font-display font-semibold underline decoration-crimson decoration-2">← Kembali ke rak cerita</a>

  <article class="page-sheet mt-6 p-6 md:p-12 relative overflow-hidden">
    <!-- Library stamp -->
    <div class="absolute top-6 right-6 stamp text-center leading-tight">
      <span class="block text-xs">Dongeng Sebelum Tidur</span>
      <span class="block text-[10px]">Perpustakaan · {catalogNo}</span>
      <span class="block text-[10px]">Tgl pinjam: —</span>
    </div>

    <div class="{seasonClass(ep.season)} text-white inline-block font-display text-xs font-bold uppercase tracking-widest px-3 py-1.5 border-2 border-ink">
      Rak {ep.season} · {ep.seasonTitle} · {catalogNo}
    </div>

    <h1 class="font-display font-bold tracking-tight text-3xl md:text-5xl leading-[1.1] mt-5 max-w-xl">{ep.title}</h1>
    <p class="mt-4 text-lg italic text-ink/80">{ep.excerpt}</p>

    <dl class="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
      <div class="border-2 border-ink p-3"><dt class="font-display font-bold uppercase text-xs">Tema</dt><dd>{ep.theme}</dd></div>
      <div class="border-2 border-ink p-3"><dt class="font-display font-bold uppercase text-xs">Baca</dt><dd>{ep.readingMinutes} menit</dd></div>
      <div class="border-2 border-ink p-3"><dt class="font-display font-bold uppercase text-xs">Halaman</dt><dd>hlm. {ep.episode}</dd></div>
      <div class="border-2 border-ink p-3"><dt class="font-display font-bold uppercase text-xs">Status</dt><dd class="text-forest font-bold">Tersedia</dd></div>
    </dl>

    <hr class="border-t-4 border-double border-ink my-8" />

    <div class="space-y-6 text-lg leading-[1.85]">
      {#each ep.content as para, i}
        <p class={i === 0 ? 'drop-cap' : ''}>{para}</p>
      {/each}
    </div>

    <p class="mt-10 text-center font-display text-sm text-ink/60">— {catalogNo} · hlm. {ep.episode} · Dongeng Sebelum Tidur —</p>
  </article>

  {#if ep.characters.length}
    <section class="mt-10">
      <h2 class="font-display font-bold text-xl">Tokoh dalam buku ini</h2>
      <div class="flex flex-wrap gap-2 mt-3">
        {#each ep.characters as name}
          <a href="{base}/tokoh/" class="font-display font-semibold border-2 border-ink bg-paper px-3 py-2 hover:bg-ink hover:text-paper">{name}</a>
        {/each}
      </div>
    </section>
  {/if}

  <nav class="mt-10 grid md:grid-cols-2 gap-4" aria-label="Episode lain">
    {#if prev}
      <a href="{base}/cerita/{prev.slug}/" class="catalog-card p-5 no-underline hover:-translate-y-1 transition-transform">
        <p class="font-display text-xs font-bold uppercase tracking-widest text-sea">← Buku sebelumnya</p>
        <p class="font-display font-bold text-lg mt-1">ep.{String(prev.episode).padStart(2, '0')} {prev.title}</p>
      </a>
    {:else}
      <span></span>
    {/if}
    {#if next}
      <a href="{base}/cerita/{next.slug}/" class="catalog-card p-5 no-underline text-right hover:-translate-y-1 transition-transform">
        <p class="font-display text-xs font-bold uppercase tracking-widest text-crimson">Buku berikutnya →</p>
        <p class="font-display font-bold text-lg mt-1">ep.{String(next.episode).padStart(2, '0')} {next.title}</p>
      </a>
    {/if}
  </nav>
</section>
