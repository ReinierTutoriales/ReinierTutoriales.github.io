import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve('build');
const sitemap = await readFile(resolve(root,'sitemap.xml'),'utf8');
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname);
async function pageAssetSizes(path) {
  const html = await readFile(resolve(root,path.slice(1),'index.html'),'utf8');
  const assets = [...html.matchAll(/<link\b([^>]+)>/g)].map(([,attrs]) => ({ href:attrs.match(/href="([^"]+)"/)?.[1], rel:attrs.match(/rel="([^"]+)"/)?.[1] })).filter(asset => asset.href?.startsWith('/'));
  const total = async rel => {
    const hrefs = new Set(assets.filter(asset => asset.rel===rel).map(asset => asset.href));
    return (await Promise.all([...hrefs].map(href => stat(resolve(root,href.slice(1)))))).reduce((sum,item) => sum+item.size,0);
  };
  return { path, html_bytes:Buffer.byteLength(html), preloaded_js_bytes:await total('modulepreload'), css_bytes:await total('stylesheet') };
}
const pages = await Promise.all(paths.map(pageAssetSizes));
async function bundleBytes(directory) {
  let bytes=0;
  for(const entry of await readdir(directory,{withFileTypes:true})) {
    const file=resolve(directory,entry.name);
    if(entry.isDirectory()) bytes+=await bundleBytes(file);
    else if(/\.(js|css)$/.test(entry.name)) bytes+=(await stat(file)).size;
  }
  return bytes;
}
console.log(JSON.stringify({ units:'bytes, uncompressed', scope:'Static files declared by HTML, not browser timings or Core Web Vitals', total_js_css_bytes:await bundleBytes(resolve(root,'_app')), pages },null,2));
