# Market Streaming

Dashboard frontend para visualización de precios de acciones en tiempo real, consumiendo datos vía WebSocket desde la API pública de [Finnhub.io](https://finnhub.io).

## Propósito

Proveer una interfaz reactiva que muestre cotizaciones de mercado actualizadas al instante (NYSE/NASDAQ), incluyendo precio actual, variación y volumen de cada símbolo seguido por el usuario.

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | React 19 + TypeScript |
| Build tool | Vite |
| Estilos | Tailwind CSS v4 |
| Charts | TradingView Lightweight Charts |
| Routing | TanStack Router v1 |
| Architecture linter | Steiger + @feature-sliced/steiger-plugin |
| Estado global | Zustand |
| Fuente de datos | Finnhub WebSocket API |

## Arquitectura — Feature-Sliced Design (FSD)

El proyecto sigue una versión simplificada de [Feature-Sliced Design](https://feature-sliced.design/), organizada en capas con dependencias unidireccionales (las capas superiores pueden importar de las inferiores, nunca al revés).

```
src/
├── app/                  # Punto de entrada, providers, rutas globales
├── features/             # Casos de uso del usuario
│   ├── watchlist/        # Agregar/quitar símbolos a seguir
│   └── price-chart/      # Visualización del gráfico de precio
├── entities/
│   └── symbol/           # Modelo de dominio: tipos, store Zustand, lógica de precio
└── shared/
    ├── lib/
    │   └── finnhub-ws.ts # Cliente WebSocket singleton
    └── ui/               # Componentes visuales reutilizables (Badge, Card…)
```

### Flujo de datos

```
Finnhub WebSocket
      ↓
shared/lib/finnhub-ws   (conexión y parseo de mensajes)
      ↓
entities/symbol/store   (Zustand — estado normalizado por símbolo)
      ↓
features/*              (consumen el store, disparan acciones)
      ↓
UI                      (re-renderiza solo los componentes afectados)
```

### Reglas de importación

- `app` puede importar de cualquier capa.
- `features` puede importar de `entities` y `shared`.
- `entities` puede importar de `shared`.
- `shared` no importa de ninguna capa superior.

## Variables de entorno

Copia `.env.example` a `.env.local` y completa los valores:

```
VITE_FINNHUB_API_KEY=your_api_key_here
```

Obtén tu API key gratuita en [finnhub.io/register](https://finnhub.io/register).

## Desarrollo

```bash
npm install
npm run dev
```

## Linting

```bash
npm run lint            # ESLint — calidad de código
npm run lint:arch       # Steiger — validación de arquitectura FSD
npm run lint:arch:watch # Steiger en modo watch durante desarrollo
```

Steiger valida que las importaciones entre capas respeten las reglas de FSD (ej: `entities` no puede importar de `features`). Se recomienda correrlo junto al servidor de desarrollo.

## Tests

```bash
npm run test
```
