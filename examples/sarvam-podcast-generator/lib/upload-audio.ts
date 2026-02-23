import { trackAudioFileRecord } from './cleanup-audio-files';

interface UploadAudioResult {
  url: string;
  fileKey: string;
}

export async function uploadBase64AudioWithCleanup(
  base64Audio: string,
  fileName: string,
  customId: string,
  cleanupDelayMinutes = 10,
  jobId?: string,
): Promise<UploadAudioResult> {
  const normalizedDataUrl = base64Audio.startsWith('data:audio/')
    ? base64Audio
    : `data:audio/mpeg;base64,${base64Audio}`;

  const cleanupWindowMinutes = Math.max(1, cleanupDelayMinutes);
  const fileKey = `${customId}-${cleanupWindowMinutes}m`;

  if (jobId) {
    trackAudioFileRecord(jobId, [fileKey]);
  }

  // Keep the same return contract even when using local data URLs.
  return {
    url: normalizedDataUrl,
    fileKey,
  };
}

export async function fetchAudioDataUrl(url: string): Promise<string> {
  if (url.startsWith('data:audio/')) {
    return url;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch audio URL: ${response.status}`);
  }

  const dataUrl = await response.text();
  if (!dataUrl.startsWith('data:audio/')) {
    throw new Error('Invalid audio payload returned from remote URL');
  }

  return dataUrl;
}
