# Resumen de Sesión — 2026-04-01 01:32:19

| Campo | Valor |
|-------|-------|
| Proyecto | `D:\x-cristhian-villegas` |
| Session ID | `355c5653-bc7a-4c82-babf-502bfbb8d9a3` |
| Archivo | `history/SUMMARIZE_39.md` |

## Objetivo
tengo algun yml para github actions?

## Conversación
**Usuario:** tengo algun yml para github actions?

**Claude:** El archivo `.github/workflows/publish.yml` existe pero está **vacío**. Fue creado en el commit `2cf4e83` ("Create publish.yml") pero no tiene contenido.

¿Quieres que le agregue un workflow? Por ejemplo para deploy del portfolio de Angular, o algún otro propósito?

**Usuario:** Usando este como referencia creame lo necesario para publicar mi app desde github a un vps D:\rest-client-agvb-web\.github\workflows\publish.yml

**Claude:** Ahora déjame ver la estructura de tu portfolio para adaptar el workflow.

**Claude:** Es una app Angular 18 pura (sin backend). Necesitas un **Dockerfile** para construir y servir con Nginx, un **docker-compose.yml**, y el **workflow** adaptado. Te creo los 3 archivos:

**Claude:** Listo. Te creé 4 archivos:

| Archivo | Propósito |
|---|---|
| `portfolio/Dockerfile` | Multi-stage build: Node 20 compila Angular → Nginx sirve los estáticos |
| `portfolio/nginx.conf` | SPA routing (`try_files`), cache de assets, gzip |
| `docker-compose.yml` | Servicio portfolio desde GHCR, puerto configurable |
| `.github/workflows/publish.yml` | Build → push a GHCR → deploy al VPS por SSH |

### Secrets que necesitas configurar en GitHub

En tu repo → Settings → Secrets and variables → Actions:

| Secret | Valor |
|---|---|
| `SSH_HOST` | IP o dominio de tu VPS |
| `SSH_USER` | Usuario SSH (ej. `deploy`) |
| `SSH_PRIVATE_KEY` | Llave privada SSH completa |
| `GHCR_TOKEN` | PAT con permiso `read:packages` (para que el VPS pueda hacer pull) |
| `APP_PORT` | Puerto donde quieres exponer la app (ej. `80` o `3000`) |

### En tu VPS necesitas

1. **Docker** y **Docker Compose** instalados
2. El usuario SSH con permisos para ejecutar `docker`

El workflow solo se ejecuta cuando cambias archivos en `portfolio/`, `docker-compose.yml` o el propio workflow.

## Notas
_Resumen generado sin API (ANTHROPIC_API_KEY no disponible)_
