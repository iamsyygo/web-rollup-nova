import type { App } from 'vue'

import * as components from './components'
export * from './components'

export const install = function (app: App) {
  Object.keys(components).forEach(key => {
    const component = (components as Record<keyof any, any>)[key]
    if (component.install) {
      app.use(component)
    }
  })
  // app.config.globalProperties.$message = components.message
  // app.config.globalProperties.$notification = components.notification
  // app.config.globalProperties.$info = components.Modal.info
  // app.config.globalProperties.$success = components.Modal.success
  // app.config.globalProperties.$error = components.Modal.error
  // app.config.globalProperties.$warning = components.Modal.warning
  // app.config.globalProperties.$confirm = components.Modal.confirm
  // app.config.globalProperties.$destroyAll = components.Modal.destroyAll
  return app
}

export default {
  install,
}

// https://github.com/vueComponent/ant-design-vue/blob/main/tsconfig.json
