import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'],
  outDir: 'dist',
  clean: true,
  rollup: {
    emitCJS: true
  }
})
