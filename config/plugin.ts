import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'


export function createPlugins(env: Record<string, string>, command: "build" | "serve") {
  return [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      // dts: '../auto-imports.d.ts'
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      // dts: '../components.d.ts'
    }),
    viteMockServe({
      mockPath: 'mock',
      ignore: /^\_/, // 忽略下划线开头的文件
      localEnabled: command === 'serve',
      prodEnabled: command !== 'serve' && env.VITE_USE_MOCK == 'true',
      //  这样可以控制关闭mock的时候不让mock打包到最终代码内
      injectCode: `
        import { setupProdMockServer } from '../mock/_mockProdServer';
        setupProdMockServer();
      `
    })
  ]
}