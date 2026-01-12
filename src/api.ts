import type { ApiResponse } from './types';

export async function fetchArtworks(page: number, limit: number): Promise<ApiResponse> {
  const res = await fetch(
    `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${limit}`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch artworks');
  }
  return res.json();
}
