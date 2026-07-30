const YOUTUBE_ID_PATTERN = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

export function getYouTubeId(url: string): string | null {
  return YOUTUBE_ID_PATTERN.exec(url)?.[1] ?? null;
}
