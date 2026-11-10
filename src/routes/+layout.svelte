<script lang="ts">
  import '../app.css';
  import { base } from '$app/paths';

  let { children } = $props();

  const nav = [
    { href: `${base}/`, label: 'Beranda', no: '01' },
    { href: `${base}/cerita/`, label: 'Cerita', no: '02' },
    { href: `${base}/tokoh/`, label: 'Tokoh', no: '03' },
    { href: `${base}/tentang/`, label: 'Tentang', no: '04' }
  ];
</script>

<div class="min-h-screen flex flex-col">
  <header class="border-b-4 border-ink bg-parchment">
    <div class="mx-auto max-w-6xl px-5 py-4 flex flex-wrap items-center justify-between gap-4">
      <a href="{base}/" class="flex items-center gap-3">
        <span class="inline-block bg-crimson text-white font-display font-bold px-3 py-2 border-2 border-ink shadow-[4px_4px_0_#1a1611]">SN</span>
        <span>
          <span class="block font-display font-bold tracking-tight text-xl leading-none">Perpustakaan Dongeng Sebelum Tidur</span>
          <span class="block text-xs uppercase tracking-[0.2em] text-ink/70 mt-1">Novel library &middot; ruang baca &middot; katalog ep.</span>
        </span>
      </a>
      <nav aria-label="Utama" class="flex flex-wrap gap-2">
        {#each nav as item}
          <a href={item.href} class="font-display text-sm font-semibold border-2 border-ink bg-paper px-3 py-2 hover:bg-ink hover:text-paper transition-colors">
            <span class="text-crimson">[{item.no}]</span> {item.label}
          </a>
        {/each}
      </nav>
    </div>
    <div class="shelf-plank" aria-hidden="true"></div>
  </header>

  <main class="flex-1">
    {@render children()}
  </main>

  <footer class="mt-16 border-t-4 border-ink bg-parchment">
    <div class="shelf-plank" aria-hidden="true"></div>
    <div class="mx-auto max-w-6xl px-5 py-8 grid gap-6 md:grid-cols-2">
      <div class="catalog-card p-5">
        <p class="font-display font-bold uppercase tracking-widest text-sm text-sea">Kartu anggota perpustakaan</p>
        <p class="mt-2"><strong>Perpustakaan Dongeng Sebelum Tidur</strong> &middot; dikelola lewat <a class="underline decoration-crimson decoration-2" href="https://nyawit-dev.github.io/">nyawit-dev.github.io</a></p>
        <p class="mt-2 text-sm text-ink/80">No. anggota: SN-ID &middot; pinjam sepuasnya, kembalikan dengan komentar.</p>
      </div>
      <div class="p-5 border-2 border-dashed border-ink/60">
        <p class="font-display font-bold uppercase tracking-widest text-sm text-crimson">Pemberitahuan fiksi</p>
        <p class="mt-2 text-sm">Seluruh kota, tokoh, dan peristiwa adalah <strong>fiksi dan satire</strong>. Kemiripan dengan orang atau tempat nyata adalah kebetulan — kecuali yang memang disindir, itu pun menyindir kebijakan, bukan individu.</p>
      </div>
    </div>
  </footer>
</div>
