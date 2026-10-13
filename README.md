# Planificador de Clases

Aplicación React + Vite + MUI para publicar el cronograma y las presentaciones de Laboratorio de Software.

## Comandos

```bash
pnpm install
pnpm dev
pnpm build
```

## Configuración

- `src/data/site.json`: identidad institucional, cursada, logo y docentes.
- `src/data/classes.json`: clases visibles en la agenda.
- `src/data/presentations/`: contenido parametrizado de las presentaciones.
- `src/data/presentations/index.js`: registro que vincula cada `presentationId` con su JSON.

Para agregar una clase, incorpore su registro en `classes.json`. Si utiliza una presentación nueva, agregue el JSON correspondiente y regístrelo en `presentations/index.js`.
