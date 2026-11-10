<script lang="ts">
  import { base } from '$app/paths';
  import books from '$lib/data/books.json';
  import episodes from '$lib/data/episodes.json';
</script>

<svelte:head>
  <title>Dongeng Sebelum Tidur — Perpustakaan Novel Satir</title>
  <meta name="description" content="Novel satir episodik: tiap rak adalah sebuah buku, tiap bab adalah episode." />
  <meta property="og:title" content="Dongeng Sebelum Tidur — Perpustakaan Novel Satir" />
  <meta property="og:description" content="Novel satir episodik: tiap rak adalah sebuah buku, tiap bab adalah episode." />
</svelte:head>

<section class="mx-auto max-w-4xl px-6 py-10">
  <p class="text-crimson text-sm font-semibold uppercase tracking-widest">Ruang baca utama</p>
  <h1 class="font-display font-bold text-3xl leading-tight mt-2">Dongeng Sebelum Tidur</h1>
  <p class="mt-3 text-ink/80 text-lg leading-relaxed">
    Novel satir episodik: tiap rak adalah sebuah buku, tiap bab adalah episode.
  </p>

  <div class="shelf mt-6">
    {#each books as book (book.no)}
      <article class="book">
        <div class="spine {book.color}">{String(book.no).padStart(2, '0')}</div>
        <div class="book-body">
          <div class="rak-line">
            <span class="rak-tag">Rak {book.rak}</span>
            <span class="rak-title">{book.rakTitle}</span>
          </div>
          <h3 class="book-title">Buku {book.no}</h3>
          <ul class="chapters">
            {#each book.episodes as slug}
              {@const ep = episodes.find((e) => e.slug === slug)}
              {#if ep}
                <li>
                  <a href="{base}/cerita/{ep.slug}/">
                    <span class="chap-no">bab {String(ep.episode).padStart(2, '0')}</span>
                    <span class="chap-title">{ep.title}</span>
                  </a>
                </li>
              {/if}
            {/each}
          </ul>
        </div>
      </article>
    {/each}
  </div>

  <a href="{base}/cerita/" class="mt-6 block text-crimson font-display font-bold text-lg hover:text-crimson/80 border-b-2 border-crimson pb-1">
    Buka Katalog Buku →
  </a>
</section>
