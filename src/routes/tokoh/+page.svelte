<script lang="ts">
  import { base } from '$app/paths';
  import characters from '$lib/data/characters.json';
  import episodes from '$lib/data/episodes.json';

  function episodeTitle(slug: string): string {
    return episodes.find((e) => e.slug === slug)?.title ?? slug;
  }
</script>

<svelte:head>
  <title>Katalog Tokoh — Dongeng Sebelum Tidur | Perpustakaan Novel Satir</title>
  <meta name="description" content="Kartu anggota dan katalog tokoh Dongeng Sebelum Tidur: peran, moto, dan daftar episode tempat mereka muncul." />
  <meta property="og:title" content="Katalog Tokoh — Dongeng Sebelum Tidur" />
  <meta property="og:description" content="Kenali para penghuni Dongeng Sebelum Tidur lewat kartu katalog perpustakaan." />
</svelte:head>

<section class="mx-auto max-w-6xl px-5 pt-10">
  <p class="font-display text-xs font-bold uppercase tracking-[0.25em] text-sea">Kartu anggota &middot; katalog tokoh</p>
  <h1 class="font-display font-bold tracking-tight text-4xl md:text-5xl mt-2">Tokoh</h1>
  <p class="mt-3 max-w-2xl">Setiap penghuni terdaftar punya kartu anggota. Peran adalah jabatan di rak fiksi — bukan orang nyata.</p>

  <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
    {#each characters as c, i}
      <article class="catalog-card p-6 flex flex-col">
        <div class="flex justify-between items-start">
          <span class="font-display font-bold bg-ink text-paper px-3 py-1 text-xs tracking-widest">ANGGOTA SN-{String(i + 1).padStart(3, '0')}</span>
          <span class="stamp !border-2 !py-1 !px-2 text-[10px]">Fiksi</span>
        </div>
        <h2 class="font-display font-bold text-2xl mt-4">{c.name}</h2>
        <p class="font-display font-semibold text-crimson uppercase tracking-widest text-sm mt-1">{c.role}</p>
        <p class="mt-3 text-ink/85">{c.description}</p>
        {#if c.motto}
          <blockquote class="mt-4 border-l-4 border-sea pl-4 italic">“{c.motto}”</blockquote>
        {/if}
        {#if c.episodes?.length}
          <div class="mt-4 pt-4 border-t-2 border-dashed border-ink/30">
            <p class="font-display text-xs font-bold uppercase tracking-widest">Muncul di {c.episodes.length} buku:</p>
            <ul class="mt-2 flex flex-wrap gap-2">
              {#each c.episodes as slug}
                <li>
                  <a href="{base}/cerita/{slug}/" class="inline-block font-display text-xs font-semibold border-2 border-ink px-2 py-1 hover:bg-ink hover:text-paper">{episodeTitle(slug)}</a>
                </li>
              {/each}
            </ul>
          </div>
        {/if}
      </article>
    {/each}
  </div>
</section>
