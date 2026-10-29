// The first browser language selects the edition on every page entry.
// Spanish regional variants use the root; all other languages use /en/.
(() => {
  const preferredLanguage = navigator.languages?.[0] || navigator.language || "es";
  const useSpanish = /^es(?:-|$)/i.test(preferredLanguage);
  const { pathname, search, hash } = window.location;
  const isEnglishPage = pathname === "/en" || pathname.startsWith("/en/");

  const shouldRedirect = useSpanish ? isEnglishPage : !isEnglishPage;
  if (!shouldRedirect) return;

  let pagePath = isEnglishPage ? pathname.slice(3) || "/" : pathname;
  if (pagePath === "/index.html") pagePath = "/";
  const destination = useSpanish ? pagePath : `/en${pagePath}`;
  window.location.replace(`${destination}${search}${hash}`);
})();
