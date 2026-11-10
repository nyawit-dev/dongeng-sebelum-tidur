import { error } from '@sveltejs/kit';
import episodes from '$lib/data/episodes.json';

export function entries() {
  return episodes.map((e) => ({ slug: e.slug }));
}

export function load({ params }) {
  const index = episodes.findIndex((e) => e.slug === params.slug);
  if (index === -1) error(404, 'Buku tidak ditemukan di rak');
  return {
    episode: episodes[index],
    prev: index > 0 ? episodes[index - 1] : null,
    next: index < episodes.length - 1 ? episodes[index + 1] : null
  };
}
