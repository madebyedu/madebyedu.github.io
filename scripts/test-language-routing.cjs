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
  const page = "/projects/natural-light-project.html?source=test#case-title";
  assert.equal(destination(["en-GB"], page), `/en${page}`);
  assert.equal(destination(["es-ES"], `/en${page}`), page);
});
test("Home URL variants resolve without redirect loops", () => {
  assert.equal(destination(["en"], "/index.html#projects"), "/en/#projects");
  assert.equal(destination(["es"], "/en/index.html#projects"), "/#projects");
  assert.equal(destination(["es"], "/en"), "/");
  assert.equal(destination(["en"], "/en/"), null);
  assert.equal(destination(["es"], "/"), null);
});
test("Browser language fallback and missing language preferences", () => {
  assert.equal(destination([], "/", "en-GB"), "/en/");
  assert.equal(destination(undefined, "/en/", "es-ES"), "/");
  assert.equal(destination([], "/en/"), "/");
});
