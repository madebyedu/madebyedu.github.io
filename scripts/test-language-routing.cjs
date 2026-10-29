const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const { runInNewContext } = require("node:vm");

const script = readFileSync(join(__dirname, "../assets/js/language.js"), "utf8");
function destination(languages, path, language) {
  const url = new URL(path, "https://portfolio.example");
  let redirectedTo = null;
  runInNewContext(script, {
    navigator: { languages, language },
    window: { location: {
      pathname: url.pathname, search: url.search, hash: url.hash,
      replace(value) { redirectedTo = value; },
    } },
  });
  return redirectedTo;
}

test("Spanish regional variants select the Spanish edition", () => {
  for (const locale of ["es", "es-ES", "es-MX", "es-AR", "es-419", "ES-co"]) {
    assert.equal(destination([locale], "/en/"), "/");
    assert.equal(destination([locale], "/about.html"), null);
  }
});
test("Other languages select English, using only the first preference", () => {
  for (const locales of [["en-US"], ["fr-FR", "es-ES"], ["ca-ES"], ["de-DE"]]) {
    assert.equal(destination(locales, "/"), "/en/");
    assert.equal(destination(locales, "/en/about.html"), null);
  }
  assert.equal(destination(["es-ES", "en-US"], "/"), null);
});
test("Project destinations, queries and anchors survive both directions", () => {
  assert.equal(destination(["en-GB"], "/projects/luz-natural.html?source=test#case-title"), "/en/projects/natural-light.html?source=test#case-title");
  assert.equal(destination(["es-ES"], "/en/projects/natural-light.html?source=test#case-title"), "/projects/luz-natural.html?source=test#case-title");
});
test("Home URL variants resolve without redirect loops", () => {
  assert.equal(destination(["en"], "/index.html#projects"), "/en/#projects");
  assert.equal(destination(["es"], "/en/index.html#projects"), "/#projects");
  assert.equal(destination(["es"], "/en"), "/");
  assert.equal(destination(["en"], "/en/"), null);
  assert.equal(destination(["es"], "/"), null);
});

const projects = [
  ["centro-porsche-valladolid-catalogo-apertura", "centro-porsche-valladolid-launch-brochure", "porsche-launch-brochure"],
  ["campana-tratamiento-antilluvia", "rain-repellent-treatment-campaign", "hydro-repelent"],
  ["campana-salud-empleados", "employee-health-campaign", "employee-healthcare-campaign"],
  ["concesionario-cupra-video-presentacion", "cupra-dealership-video", "brand-identity-video"],
  ["tarjetas-visita-outletcars", "outletcars-business-cards", "business-card-design"],
  ["luz-natural", "natural-light", "natural-light-project"],
];
test("Every old URL opens the renamed project in the browser language", () => {
  for (const [es, en, old] of projects) {
    for (const prefix of ["", "/en"]) {
      const url = `${prefix}/projects/${old}.html?ref=old#case-title`;
      assert.equal(destination(["es-MX"], url), `/projects/${es}.html?ref=old#case-title`);
      assert.equal(destination(["en-US"], url), `/en/projects/${en}.html?ref=old#case-title`);
    }
  }
});
test("Localized project URLs choose their counterpart without loops", () => {
  for (const [es, en] of projects) {
    assert.equal(destination(["es-ES"], `/projects/${es}.html`), null);
    assert.equal(destination(["en-US"], `/en/projects/${en}.html`), null);
    assert.equal(destination(["es-ES"], `/en/projects/${en}.html`), `/projects/${es}.html`);
    assert.equal(destination(["en-US"], `/projects/${es}.html`), `/en/projects/${en}.html`);
  }
});
test("Browser language fallback and missing language preferences", () => {
  assert.equal(destination([], "/", "en-GB"), "/en/");
  assert.equal(destination(undefined, "/en/", "es-ES"), "/");
  assert.equal(destination([], "/en/"), "/");
});
