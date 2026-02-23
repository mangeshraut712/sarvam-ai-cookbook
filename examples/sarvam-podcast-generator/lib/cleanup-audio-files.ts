export interface AudioFileRecord {
  jobId: string;
  fileKeys: string[];
  uploadedAt: Date;
}

const audioFileRecords = new Map<string, AudioFileRecord>();

export function trackAudioFileRecord(jobId: string, fileKeys: string[]) {
  if (!jobId || fileKeys.length === 0) {
    return;
  }

  const existing = audioFileRecords.get(jobId);
  if (existing) {
    existing.fileKeys.push(...fileKeys);
    existing.uploadedAt = new Date();
    return;
  }

  audioFileRecords.set(jobId, {
    jobId,
    fileKeys: [...fileKeys],
    uploadedAt: new Date(),
  });
}

export function getAllAudioFileRecords(): AudioFileRecord[] {
  return Array.from(audioFileRecords.values());
}

export function getAudioFileRecord(jobId: string): AudioFileRecord | null {
  return audioFileRecords.get(jobId) ?? null;
}

export function removeAudioFileRecord(jobId: string): void {
  audioFileRecords.delete(jobId);
}
