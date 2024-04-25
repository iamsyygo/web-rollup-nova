// import { fileURLToPath } from 'node:url'
// import { glob } from 'glob'

import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// import typescript from '@rollup/plugin-typescript'
import typescript2 from 'rollup-plugin-typescript2'
import clear from 'rollup-plugin-delete'

// import alias from '@rollup/plugin-alias'

// 已经不维护了
import vue from 'rollup-plugin-vue'
// import typescript from 'rollup-plugin-typescript2'

// const rootPath = fileURLToPath(new URL('.', import.meta.url))
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
        format: 'esm',
      },
      {
        file: 'packages/components/antd/lib/index.js',
        format: 'commonjs',
      },
    ],
    plugins: [
      clear({
        targets: [
          'packages/components/antd/es',
          'packages/components/antd/lib',
        ],
      }),

      vue({
        exclude: 'node_modules/**',
        target: 'browser',
      }),
      nodeResolve(),
      commonjs(),
      {
        transform(code, id) {
          console.log('vvvvvvvvvvvvvvv')
          console.log(id)
          console.log('---------------')
          console.log(code)
          console.log('^^^^^^^^^^^^^^^')
          // not returning anything, so doesn't affect bundle
        },
      },

      // fix https://github.com/rollup/plugins/issues/608#issuecomment-787460629
      // typescript({
      //   include: [
      //     'packages/components/antd/**/*',
      //     // 'packages/components/antd/**/*.vue',
      //     'vite-env.d.ts',
      //     // 'packages/components/antd/affix/src/Affix.vue?vue&type=script&setup=true&lang.ts',
      //   ],
      //   rootDir: '.',
      //   exclude: [
      //     'node_modules/**',
      //     'packages/components/antd/es/**',
      //     'packages/components/antd/lib/**',
      //   ],
      //   outDir: 'packages/components/antd/',
      // }),
      typescript2({}),
    ],
    external: ['vue'],
  },
])
