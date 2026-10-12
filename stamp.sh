#!/bin/sh
# Sella index.html con la huella de styles.css y app.js para que el navegador
# nunca reutilice una versión vieja en caché. Ejecutar antes de cada commit.
set -e
cd "$(dirname "$0")"
css=$(sha1sum styles.css | cut -c1-10)
js=$(sha1sum app.js | cut -c1-10)
sed -i -E "s#href=\"styles\.css(\?v=[a-f0-9]+)?\"#href=\"styles.css?v=$css\"#; s#src=\"app\.js(\?v=[a-f0-9]+)?\"#src=\"app.js?v=$js\"#" index.html
echo "styles.css?v=$css  app.js?v=$js"
