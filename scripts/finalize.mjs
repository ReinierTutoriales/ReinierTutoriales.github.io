import { copyFile } from 'node:fs/promises';
await copyFile('build/not-found/index.html', 'build/404.html');
