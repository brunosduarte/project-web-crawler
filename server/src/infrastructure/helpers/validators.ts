export const isValidURL = (href: string | URL): boolean  => {
  try {
    new URL(href)
    return true;
  } catch (e) {
    return false;
  }
}

export const ensureHttps = (url: string): string => {
  const regex = /^(https:\/\/)/;
  if (!regex.test(url)) {
      return `https://${url}`;
  }
  return url;
}

export const sanitizeURL = (href: string | URL): string | void => {
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