export const isValidURL = (href: string): boolean  => {
  try {
    new URL(href)
    return true;
  } catch (e) {
    return false;
  }
}

export const sanitizeURL = (href: string): string | undefined => {
  try {
    const url = new URL(href)
    url.hash = '';
    return url.toString();
  } catch (e) {
    return undefined;
  }
}

export const isSameDomain = (urlA?: string, urlB?: string): boolean => {
  if(!urlA || !urlB) {
    return false;
  }
  try {
    const a = new URL(urlA);
    const b = new URL(urlB);
    return a.hostname === b.hostname;
  } catch(e) {
    return false;
  }
}