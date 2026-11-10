<script lang="ts">
  import { base } from '$app/paths';
  import characters from '$lib/data/characters.json';
</script>

<svelte:head>
  <title>Katalog Tokoh — Dongeng Sebelum Tidur</title>
  <meta name="description" content="Kartu anggota dan katalog tokoh Dongeng Sebelum Tidur." />
  <meta property="og:title" content="Katalog Tokoh — Dongeng Sebelum Tidur" />
  <meta property="og:description" content="Kenali para penghuni Dongeng Sebelum Tidur lewat kartu katalog perpustakaan." />
</svelte:head>

<section class="mx-auto max-w-2xl">
  <p class="text-crimson text-sm font-semibold uppercase tracking-widest">Kartu anggota &middot; katalog tokoh</p>
  <h1 class="mt-2 font-display font-bold text-3xl leading-tight">Tokoh</h1>
  <p class="mt-3 text-ink/80 text-lg leading-relaxed">
    Penghuni perpustakaan: jabatan di rak fiksi, bukan orang nyata.
  </p>

  <ul class="mt-6 space-y-5 text-sm leading-relaxed">
    {#each characters as c, i}
      <li class="border-l-2 border-ink/15 pl-4">
        <div class="flex items-baseline justify-between gap-3">
          <span class="font-display font-bold text-base hover:text-crimson">{c.name}</span>
          <span class="shrink-0 text-[11px] font-mono text-ink/50">SN-{String(i + 1).padStart(3, '0')} · Fiksi</span>
        </div>
        <p class="mt-1 text-ink/80">{c.role} — {c.description}</p>
        {#if c.motto}
          <p class="mt-1 italic text-ink/70 text-sm">“{c.motto}”</p>
        {/if}
      </li>
    {/each}
  </ul>
</section>
