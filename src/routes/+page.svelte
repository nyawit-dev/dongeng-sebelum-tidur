<script lang="ts">
  import { base } from '$app/paths';
  import episodes from '$lib/data/episodes.json';
</script>

<svelte:head>
  <title>Dongeng Sebelum Tidur — Perpustakaan Novel Satir</title>
  <meta name="description" content="10 episode novel satir dalam rak per musim. Mulai dari rak pertama." />
  <meta property="og:title" content="Dongeng Sebelum Tidur — Perpustakaan Novel Satir" />
  <meta property="og:description" content="10 episode novel satir dalam rak per musim. Mulai dari rak pertama." />
</svelte:head>

<section class="mx-auto max-w-2xl">
  <p class="text-crimson text-sm font-semibold uppercase tracking-widest">Ruang baca utama</p>
  <h1 class="font-display font-bold text-3xl leading-tight mt-2">Dongeng Sebelum Tidur</h1>
  <p class="mt-3 text-ink/80 text-lg leading-relaxed">
    Novel satir episodik: setiap musim adalah satu rak, setiap rak satu buku. Ubah halaman, ubah kisah.
  </p>
  <a href="{base}/cerita/" class="mt-5 block text-crimson font-display font-bold text-lg hover:text-crimson/80 border-b-2 border-crimson pb-1">Buka Rak Cerita →</a>
</section>

<section class="mx-auto max-w-2xl mt-10">
  <h2 class="font-display font-bold text-2xl">Rak baru dipinjam</h2>
  <ul class="mt-4 space-y-5 text-sm leading-relaxed">
    {#each [...episodes].slice(-3).reverse() as ep}
      <li class="flex gap-4">
        <span class="w-10 shrink-0 font-display font-bold text-crimson">ep.{String(ep.episode).padStart(2,'0')}</span>
        <div>
          <p class="font-display font-bold text-base leading-snug">{ep.title}</p>
          <p class="text-ink/70 text-sm mt-1">{ep.excerpt}</p>
        </div>
      </li>
    {/each}
  </ul>
</section>

<section class="mx-auto max-w-2xl mt-12">
  <h2 class="font-display font-bold text-2xl">Musim &amp; rak</h2>
  <ul class="mt-4 space-y-4 text-sm leading-relaxed">
    {#each episodes.map((e) => e.season).filter((v, i, a) => a.indexOf(v) === i) as season}
      <li class="border-l-2 border-ink/20 pl-4">
        <div class="flex justify-between">
          <span class="font-display font-bold text-base">Rak {season}</span>
          <span class="text-ink/60 text-sm">{episodes.find((e) => e.season === season)!.seasonTitle} · {episodes.filter((e) => e.season === season).length} buku</span>
        </div>
        <ul class="mt-2 list-inside list-disc text-sm text-ink/80">
          {#each episodes.filter((e) => e.season === season) as ep}
            <li><a href="{base}/cerita/{ep.slug}/" class="font-semibold text-ink/80 hover:text-crimson">ep.{String(ep.episode).padStart(2,'0')} {ep.title}</a></li>
          {/each}
        </ul>
      </li>
    {/each}
  </ul>
</section>
