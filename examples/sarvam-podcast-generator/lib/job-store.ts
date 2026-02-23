export type JobState = 'pending' | 'processing' | 'completed' | 'failed';

export interface JobRecord {
  id: string;
  status: JobState;
  result?: unknown;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

const jobs = new Map<string, JobRecord>();

export async function createJob(id: string): Promise<JobRecord> {
  const now = new Date();
  const record: JobRecord = {
    id,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  };

  jobs.set(id, record);
  return record;
}

export async function updateJobStatus(
  id: string,
  status: JobState,
  result?: unknown,
  error?: string,
): Promise<JobRecord | null> {
  const existing = jobs.get(id);
  if (!existing) {
    return null;
  }

  const updated: JobRecord = {
    ...existing,
    status,
    result,
    error,
    updatedAt: new Date(),
  };

  jobs.set(id, updated);
  return updated;
}

export async function getJobStatus(id: string): Promise<JobRecord | null> {
  return jobs.get(id) ?? null;
}
