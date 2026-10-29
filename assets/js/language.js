// The first browser language selects the edition on every page entry.
// Spanish regional variants use the root; all other languages use /en/.
(() => {
  const preferredLanguage = navigator.languages?.[0] || navigator.language || "es";
  const useSpanish = /^es(?:-|$)/i.test(preferredLanguage);
  const { pathname, search, hash } = window.location;
  const isEnglishPage = pathname === "/en" || pathname.startsWith("/en/");

  let pagePath = isEnglishPage ? pathname.slice(3) || "/" : pathname;
  if (pagePath === "/index.html") pagePath = "/";
  // Each entry contains the Spanish slug, English slug and previous slug.
  const projectRoutes = [
    ["centro-porsche-valladolid-catalogo-apertura", "centro-porsche-valladolid-launch-brochure", "porsche-launch-brochure"],
    ["campana-tratamiento-antilluvia", "rain-repellent-treatment-campaign", "hydro-repelent"],
    ["campana-salud-empleados", "employee-health-campaign", "employee-healthcare-campaign"],
    ["concesionario-cupra-video-presentacion", "cupra-dealership-video", "brand-identity-video"],
    ["tarjetas-visita-outletcars", "outletcars-business-cards", "business-card-design"],
    ["luz-natural", "natural-light", "natural-light-project"],
  ];
  const project = projectRoutes.find((slugs) =>
    slugs.some((slug) => pagePath === `/projects/${slug}.html`),
  );
  if (project) {
    pagePath = `/projects/${project[useSpanish ? 0 : 1]}.html`;
  }
  const destination = useSpanish ? pagePath : `/en${pagePath}`;
  if (destination === pathname) return;
  window.location.replace(`${destination}${search}${hash}`);
})();
