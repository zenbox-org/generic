export function getHostname(url: string) {
  return new URL(url).hostname
}

export function getBaseHostname(url: string) {
  return getHostname(url).split('.').slice(-2).join('.')
}
