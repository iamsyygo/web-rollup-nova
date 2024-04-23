import { fileURLToPath } from 'node:url'
// import { glob } from 'glob'

import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import alias from '@rollup/plugin-alias'
import vue from 'rollup-plugin-vue'
// import typescript from 'rollup-plugin-typescript2'

const rootPath = fileURLToPath(new URL('.', import.meta.url))
// const files = glob.sync('./packages/**/src/**/*.ts')
export default defineConfig([
  // {
  //   input: 'packages/utils/src/index.ts',
  //   output: [
  //     {
  //       file: 'packages/utils/dist/index.js',
  //       format: 'cjs',
  //     },
  //     {
  //       file: 'packages/utils/dist/index.esm.js',
  //       format: 'esm',
  //     },
  //   ],
  //   plugins: [
  //     commonjs(),
  //     nodeResolve(),
  //     typescript({
  //       outDir: 'packages/utils/dist',
  //       include: 'packages/utils/src/**/*.ts',
  //     }),
  //   ],
  // },
  {
    input: 'packages/components/antd/index.ts',
    output: [
      {
        file: 'packages/components/antd/es/index.js',
        format: 'cjs',
      },
      {
        file: 'packages/components/antd/lib/index.esm.js',
        format: 'esm',
      },
    ],
    plugins: [
      commonjs(),
      nodeResolve(),
      typescript({
        include: [
          'packages/components/antd/**/*.vue',
          'packages/components/antd/**/*.ts',
        ],
      }),
      vue({
        exclude: 'node_modules/**',
        target: 'browser',
      }),
    ],
    external: ['vue'],
  },
])
