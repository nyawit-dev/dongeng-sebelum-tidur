<script lang="ts">
  import { base } from '$app/paths';
  import books from '$lib/data/books.json';
  import episodes from '$lib/data/episodes.json';

  type Book = typeof books[number];

  let query = $state('');
  let buku = $state('');

  const episodesBySlug = new Map<string, typeof episodes[number]>();
  for (const ep of episodes) episodesBySlug.set(ep.slug, ep);

  const activeNo = $derived(buku ? Number(buku) : null);

  const grouped = $derived.by(() => {
    const q = query.trim().toLowerCase();

    const filteredBooks = books.map((book) => {
      const chapters = book.episodes
        .map((slug) => episodesBySlug.get(slug))
        .filter((ep): ep is typeof episodes[number] => Boolean(ep))
        .filter((ep) => {
          if (!q) return true;
          return (
            ep.title.toLowerCase().includes(q) ||
            ep.excerpt.toLowerCase().includes(q) ||
            ep.theme.toLowerCase().includes(q)
          );
        });
      return { ...book, chapters };
    }).filter((book) => book.chapters.length > 0);

    if (buku) {
      const match = filteredBooks.find((b) => b.no === Number(buku));
      return match ? [match] : [];
    }
    return filteredBooks;
  });

  const count = $derived(grouped.reduce((n, book) => n + book.chapters.length, 0));
</script>

<svelte:head>
  <title>Buku di Rak — Dongeng Sebelum Tidur</title>
  <meta name="description" content="Setiap buku adalah sebuah rak. Di dalamnya banyak bab (episode)." />
  <meta property="og:title" content="Buku di Rak — Dongeng Sebelum Tidur" />
  <meta property="og:description" content="Setiap buku adalah sebuah rak. Di dalamnya banyak bab (episode)." />
</svelte:head>

<section class="mx-auto max-w-4xl px-6 py-10">
  <p class="text-crimson text-sm font-semibold uppercase tracking-widest">Katalog rak</p>
  <h1 class="mt-2 font-display font-bold text-3xl leading-tight">Buku di Rak</h1>
  <p class="mt-3 text-ink/80 text-lg leading-relaxed">
    Satu buku = satu rak. Di dalamnya banyak bab (episode). Klik bab untuk membaca cerita.
  </p>

  <div class="mt-4 flex flex-col gap-3 sm:flex-row">
    <label for="q" class="font-display font-bold text-sm w-full sm:w-auto">Cari:</label>
    <input
      id="q"
      type="search"
      bind:value={query}
      placeholder="mis. balai kota, banjir, musim 2…"
      class="border border-ink/20 px-4 py-2 font-serif focus:border-crimson focus:outline-none"
    />
    {#if query}
      <button onclick={() => (query = '')} class="border border-ink/20 px-3 py-2 font-display font-semibold text-crimson hover:text-white hover:bg-crimson">Bersihkan</button>
    {/if}
  </div>

  <p class="mt-4 text-sm text-ink/70">Buku: <span class="font-display">{grouped.length} buku · {count} bab</span></p>

  <div class="mt-3 shelf">
    {#each grouped as book (book.no)}
      <article class="book">
        <div class="spine {book.color}">{String(book.no).padStart(2, '0')}</div>
        <div class="book-body">
          <div class="rak-line">
            <span class="rak-tag">Rak {book.rak}</span>
            <span class="rak-title">{book.rakTitle}</span>
          </div>
          <h2 class="book-title">Buku {book.no}</h2>
          <p class="book-subtitle">{book.subtitle}</p>
          <ol class="chapters">
            {#each book.chapters as ep (ep.slug)}
              <li>
                <a href="{base}/cerita/{ep.slug}/" class="chapter">
                  <span class="chap-no">bab {String(ep.episode).padStart(2, '0')}</span>
                  <span class="chap-title">{ep.title}</span>
                  <span class="chap-excerpt">{ep.excerpt}</span>
                </a>
              </li>
            {/each}
          </ol>
        </div>
      </article>
    {/each}
  </div>

  <p class="mt-6 text-sm text-ink/70">
    {count} bab ditemukan {query ? ` untuk “${query}”` : ''}{' '}
    (dari {grouped.length} buku yang terlihat dari {books.length} buku, {episodes.length} bab total).
  </p>
</section>
