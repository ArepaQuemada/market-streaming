# Market Streaming — Contexto del proyecto

## Mi rol en este proyecto

Soy **code reviewer, documentador y generador de tests**. No escribo código de implementación salvo que se me pida explícitamente (README, config, boilerplate inicial). Mi trabajo es:

- Revisar código que el usuario comparte y dar feedback concreto
- Señalar violaciones de arquitectura FSD
- Generar tests unitarios cuando se me pide
- Mantener la documentación actualizada

## El proyecto

Dashboard frontend de precios de acciones NASDAQ en tiempo real. Consume datos vía WebSocket desde **Finnhub.io** (free tier). El usuario puede ver una lista de 20 símbolos con precios live y navegar al detalle de cada uno con un gráfico histórico/tiempo real.

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | React 19 + TypeScript |
| Build tool | Vite |
| Routing | TanStack Router v1 (file-based) |
| Estilos | Tailwind CSS v4 |
| Charts | TradingView Lightweight Charts |
| Estado global | Zustand |
| Architecture linter | Steiger + @feature-sliced/steiger-plugin |
| Fuente de datos | Finnhub WebSocket API |

## Arquitectura — Feature-Sliced Design (FSD)

```
src/
├── app/                  # Punto de entrada, providers, rutas globales
├── features/
│   ├── watchlist/        # Listar y seguir símbolos
│   └── price-chart/      # Gráfico de precio (live + histórico)
├── entities/
│   └── symbol/           # Tipos, store Zustand, lógica de precio
└── shared/
    ├── lib/
    │   ├── finnhub-ws.ts  # Cliente WebSocket singleton
    │   └── finnhub-rest.ts # Cliente REST para histórico
    └── ui/               # Componentes reutilizables (Badge, Card…)
```

### Reglas de importación (no negociables)

- `app` puede importar de cualquier capa
- `features` puede importar de `entities` y `shared`
- `entities` puede importar de `shared`
- `shared` no importa de ninguna capa superior

Verificar con: `npm run lint:arch`

## Sprint Plan

### Sprint 1 — Fundación e infraestructura ← ACTUAL
- [x] Crear estructura de carpetas FSD
- [x] Configurar TanStack Router (`__root.tsx`, `index.tsx`, `$ticker.tsx`)
- [ ] Definir tipos de dominio en `entities/symbol`
- [ ] Implementar cliente WebSocket en `shared/lib/finnhub-ws.ts`
- [ ] Crear store Zustand en `entities/symbol/store.ts`

### Sprint 2 — Home: listado de stocks
- [ ] Definir lista estática de 20 símbolos NASDAQ
- [ ] Conectar WebSocket al montar la app y suscribir símbolos
- [ ] Construir `StockRow` en `shared/ui`
- [ ] Construir feature `watchlist`
- [ ] Indicador visual verde/rojo por variación de precio

### Sprint 3 — Navegación y ruta de detalle
- [ ] Configurar ruta dinámica `/$ticker` con validación de params
- [ ] Layout de página de detalle
- [ ] Breadcrumb / botón de regreso
- [ ] Manejo de símbolo inválido

### Sprint 4 — Gráfico en tiempo real
- [ ] Integrar TradingView Lightweight Charts en `features/price-chart`
- [ ] Suscribir símbolo seleccionado al WebSocket
- [ ] Configurar gráfico (serie, colores, grid)

### Sprint 5 — Histórico y selector de período
- [ ] Cliente REST Finnhub para velas históricas
- [ ] Selector de período: `1D · 1W · 1M · 3M`
- [ ] Toggle Live / Histórico

### Sprint 6 — Robustez y UX
- [ ] Reconexión automática del WebSocket
- [ ] Skeletons de carga
- [ ] Estado de error
- [ ] Diseño responsive

## Variables de entorno

```
VITE_FINNHUB_API_KEY=your_api_key_here
```
