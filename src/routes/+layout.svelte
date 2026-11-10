<script lang="ts">
  import { base } from '$app/paths';
  let { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
  <header class="border-b border-ink/10 px-6 py-4">
    <div class="mx-auto flex max-w-2xl items-center justify-between text-sm">
      <a href="{base}/" class="font-display font-bold text-lg text-ink">Perpustakaan <span class="text-crimson">Dongeng Sebelum Tidur</span></a>
      <nav class="flex gap-8 text-sm">
        <a href="{base}/" class="font-semibold text-ink/70 hover:text-ink">Beranda</a>
        <a href="{base}/cerita/" class="font-semibold text-ink/70 hover:text-ink">Cerita</a>
        <a href="{base}/tokoh/" class="font-semibold text-ink/70 hover:text-ink">Tokoh</a>
        <a href="{base}/tentang/" class="font-semibold text-ink/70 hover:text-ink">Tentang</a>
      </nav>
    </div>
  </header>

  <main class="flex-1 px-6 py-10">
    {@render children()}
  </main>

  <footer class="border-t border-ink/5 px-6 py-6 text-xs text-ink/60">
    <div class="mx-auto flex max-w-2xl flex-wrap items-center justify-between gap-3">
      <span>Perpustakaan Dongeng Sebelum Tidur</span>
      <span>nyawit-dev.github.io &nbsp;·&nbsp; semua tokoh dan peristiwa fiktif</span>
    </div>
  </footer>
</div>
