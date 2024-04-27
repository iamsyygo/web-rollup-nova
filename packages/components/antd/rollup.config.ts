import { fileURLToPath } from 'node:url'
// import { glob } from 'glob'
import { basename, resolve } from 'node:path'
import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript2 from 'rollup-plugin-typescript2'
import clear from 'rollup-plugin-delete'
import dts from 'rollup-plugin-dts'
import cleanup from 'rollup-plugin-cleanup'
// import filesize from 'rollup-plugin-filesize'
import { createFilter } from '@rollup/pluginutils'
import postcss from 'rollup-plugin-postcss'
// import ms from 'magic-string'
// import { parse } from 'acorn'
import type { OutputBundle, NormalizedOutputOptions } from 'rollup'
// import alias from '@rollup/plugin-alias'
// 已经不维护了
import vue from 'rollup-plugin-vue'

const __filename = fileURLToPath(new URL('.', import.meta.url))
// const files = glob.sync('./packages/**/src/**/*.ts')
export default defineConfig([
  {
    input: resolve(__filename, 'index.ts'),
    output: [
      {
        dir: resolve(__filename, 'es'),
        // https://rollupjs.org/configuration-options/#output-preservemodules
        // 保留原模块结构，尽可能将产物打包成一个文件
        preserveModules: true,
        // assetFileNames(chunkInfo) {
        //   return 'assets/[name].[ext]'
        // },
        format: 'esm',
      },
      {
        dir: resolve(__filename, 'lib'),
        preserveModules: true,
        format: 'commonjs',
      },
    ],
    plugins: [
      clear({
        targets: ['es', 'lib', 'theme-styles'],
      }),
      cleanup(),
      (() => {
        /**
         * magic-string 是一个用于操作字符串的库
         * fast-glob 是一个用于快速获取文件路径的库
         * acorn 是一个 JavaScript 解析器,后期可以用来解析 vue 文件
         * 其实 rollup 本身就是一个 AST 转换器，所以可以直接使用 rollup 来处理，这些方法都绑定在 this 上
         */

        const opts = {
          output: resolve(__filename, 'theme-styles'),
        }
        const filter = createFilter(['**/antd/**/*.vue'], null)
        const styles: Record<keyof any, any> = {}
        return {
          name: 'extract-antd-style',
          transform(code: string, id: string) {
            if (filter(id)) {
              const matcher = /<style[^>]*>[\s\S]+?<\/style>/g
              const matches = code.match(matcher)
              if (matches) {
                matches.forEach(match => {
                  const source = styles[id] || ''
                  styles[id] =
                    source +
                    match.replace(/<style[^>]*>/, '').replace(/<\/style>/, '')
                })
                // return code.replace(matcher, '')
                return code
              }
            }
          },
          generateBundle(
            _options: NormalizedOutputOptions,
            bundle: OutputBundle
          ) {
            for (const id in styles) {
              // 注意处理 scss 文件资源的导入转换处理,vue 特性 v-bind(动态绑定)

              // 提取id文件名称，替换为css后缀
              const fileName = basename(id).replace('.vue', '.scss')
              const realFilePath = resolve(opts.output, fileName)

              // @ts-expect-error
              bundle[realFilePath] = {
                type: 'asset',
                source: styles[id],
                fileName: realFilePath,
              }
            }
          },
        }
      })(),
      vue({
        exclude: 'node_modules/**',
        target: 'browser',
        preprocessStyles: true,
        transformAssetUrls: true,
        compilerOptions: {},
        exposeFilename: false,
      }),
      (() => {
        const filter = createFilter(['**/*.vue2.js'], null)
        return {
          name: 'unwanted-vue2-js',
          generateBundle(
            _options: NormalizedOutputOptions,
            bundle: OutputBundle
          ) {
            for (const fileName in bundle) {
              if (filter(fileName)) delete bundle[fileName]
            }
          },
        }
      })(),
      nodeResolve(),
      commonjs(),

      // fix https://github.com/rollup/plugins/issues/608#issuecomment-787460629
      // typescript(),
      typescript2(),
      postcss({
        extract: true,
        plugins: [],
      }),
      // filesize(),
    ],
    external: ['vue', 'ant-design-vue'],
  },
  {
    input: resolve(__filename, 'es/index.d.ts'),
    output: [
      {
        file: resolve(__filename, 'global.d.ts'),
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
])
