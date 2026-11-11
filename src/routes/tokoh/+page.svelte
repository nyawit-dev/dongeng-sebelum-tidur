<script lang="ts">
  import { base } from '$app/paths';
  import characters from '$lib/data/characters.json';
</script>

<svelte:head>
  <title>Katalog Tokoh — Dongeng Sebelum Tidur</title>
  <meta name="description" content="Kartu anggota dan katalog tokoh." />
  <meta property="og:title" content="Katalog Tokoh — Dongeng Sebelum Tidur" />
</svelte:head>

<section class="mx-auto max-w-3xl px-6 py-10">
  <p class="text-crimson text-sm font-semibold uppercase tracking-widest">Kartu anggota &middot; katalog tokoh</p>
  <h1 class="font-display font-bold text-3xl leading-tight mt-2">Tokoh</h1>
  <p class="mt-3 text-ink/80 text-lg leading-relaxed">
    Penghuni perpustakaan: jabatan di rak fiksi, bukan orang nyata.
  </p>

  <div class="mt-6 char-grid">
    {#each characters as c (c.name)}
      <article class="char-card">
        <div class="who">{c.role}</div>
        <h3>{c.name}</h3>
        <p>{c.description}</p>
        {#if c.motto}
          <p class="mt-2 italic text-ink/80 text-sm">“{c.motto}”</p>
        {/if}
        <p class="mt-3 text-xs text-ink/50 font-mono">SN-### · Fiksi</p>
      </article>
    {/each}
  </div>
</section>
