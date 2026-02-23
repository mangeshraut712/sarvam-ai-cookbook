import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UTApi } from 'uploadthing/server';

const f = createUploadthing();

export const uploadRouter = {
  audioText: f({
    text: {
      maxFileSize: '8MB',
      maxFileCount: 1,
    },
  })
    .middleware(() => ({}))
    .onUploadComplete(({ file }) => ({
      key: file.key,
      url: file.url,
    })),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;

export const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
});
