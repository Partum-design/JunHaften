# Haften · AHR Expo México 2026 — Reporte de resultados

Presentación interactiva (16:9) con los resultados de Facebook de **Haften** durante la campaña de **AHR Expo México 2026** (Guadalajara, 29 sep – 2 oct). Elaborada por **Partum Design**.

Incluye una segunda parte con el **análisis de servidor recomendado** para migrar el ERP de Haften (IONOS AMD/Intel, Cloud Cube, OVHcloud, Hetzner, licencias SQL/RDS, plan de migración y recomendación).

**En vivo:** https://haften-ahr-expo-2026.vercel.app

Sitio estático: `index.html`, `styles.css`, `app.js` y `assets/`. Sin build.

## Uso en pantalla
- La presentación se escala completa a cualquier pantalla (TV 4K/1080p, laptop) manteniendo proporción 16:9.
- `→` / `Espacio` siguiente · `←` anterior · `1–9` ir a diapositiva · `F` pantalla completa · `P` auto-avance (12 s).
- En celular se muestra como página con scroll.

## Datos
Fuente: Meta Business Suite, Facebook /HaftenOficial, últimos 28 días (8 sep – 5 oct 2026).
Totales exactos de la plataforma; la serie diaria y el desglose seguidores/no seguidores por formato se reconstruyeron de la gráfica (aprox.). Para actualizar, edita las constantes al inicio de `app.js` y los números en `index.html`.

## Antes de publicar
Ejecuta `./stamp.sh` después de editar `styles.css` o `app.js`: agrega la huella del archivo a la URL para que ningún navegador use estilos viejos en caché.

## Local
```
python3 -m http.server 8000
```
