export interface JobStatus<T = unknown> {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: T;
  error?: string;
  createdAt: string;
  updatedAt: string;
}

interface PollOptions {
  intervalMs?: number;
  timeoutMs?: number;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function pollJobStatus<T = unknown>(
  jobId: string,
  onUpdate?: (status: JobStatus<T>) => void,
  options: PollOptions = {},
): Promise<JobStatus<T>> {
  const intervalMs = options.intervalMs ?? 2000;
  const timeoutMs = options.timeoutMs ?? 10 * 60 * 1000;
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const response = await fetch(`/api/job-status/${jobId}`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch job status: ${response.status}`);
    }

    const status = (await response.json()) as JobStatus<T>;
    onUpdate?.(status);

    if (status.status === 'completed' || status.status === 'failed') {
      return status;
    }

    await sleep(intervalMs);
  }

  throw new Error('Timed out while waiting for podcast generation to complete');
}
