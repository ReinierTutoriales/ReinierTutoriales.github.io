import { rm } from 'node:fs/promises';
// Remove generated compiler output so repeated builds cannot retain obsolete chunks.
await rm('.svelte-kit/output', { recursive:true, force:true });
