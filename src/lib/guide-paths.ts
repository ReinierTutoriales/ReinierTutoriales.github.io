export const guideRoutes = {
  usb: { slug: 'mapear-usb-desde-windows', sourceRepo: 'Mapear-puertos-USB-para-macOS-con-USBToolBox-desde-Windows' },
  downloads: { slug: 'descargas-reanudables-w11downloaderpro', sourceRepo: 'W11DownloaderPro' }
};
export const guidePath = (slug: string) => `/guias/${slug}/`;
export const nativeGuidePath = (repo: string) => {
  const guide = Object.values(guideRoutes).find(guide => guide.sourceRepo === repo);
  return guide ? guidePath(guide.slug) : undefined;
};
