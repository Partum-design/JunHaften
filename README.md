# Haften · AHR Expo México 2026 — Reporte de resultados

Presentación interactiva (16:9) con los resultados de Facebook de **Haften** durante la campaña de **AHR Expo México 2026** (Guadalajara, 29 sep – 2 oct). Elaborada por **Partum Design**.

**En vivo:** https://haften-ahr-expo-2026.vercel.app

Sitio estático: `index.html`, `styles.css`, `app.js` y `assets/`. Sin build.

## Uso en pantalla
- La presentación se escala completa a cualquier pantalla (TV 4K/1080p, laptop) manteniendo proporción 16:9.
- `→` / `Espacio` siguiente · `←` anterior · `1–6` ir a diapositiva · `F` pantalla completa · `P` auto-avance (12 s).
- En celular se muestra como página con scroll.

## Datos
Fuente: Meta Business Suite, Facebook /HaftenOficial, últimos 28 días (8 sep – 5 oct 2026).
Totales exactos de la plataforma; la serie diaria y el desglose seguidores/no seguidores por formato se reconstruyeron de la gráfica (aprox.). Para actualizar, edita las constantes al inicio de `app.js` y los números en `index.html`.

## Local
```
python3 -m http.server 8000
```
