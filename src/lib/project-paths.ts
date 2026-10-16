export const projectSlugs = {
  "VelocityCopy": "velocitycopy",
  "disk-duplicator": "repartocopier",
  "nfdnsvpn": "nf-dns-vpn",
  "VireoLumaTV-browser": "vireolumatv",
  "W11DownloaderPro": "w11downloaderpro",
  "ColorFix": "colorfix"
} as const;
export type ProjectRepo = keyof typeof projectSlugs;
