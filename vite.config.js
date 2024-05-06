import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {join} from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 配置项目别名
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        // If you are using less-loader@5 please spread the lessOptions to options directly
        modifyVars: {
          // 'primary-color': '#1DA57A',
          // 'link-color': '#1DA57A',
          // 'border-radius-base': '2px',
        },
        additionalData: `
          @import "ant-design-vue/lib/style/themes/default.less";
          @import "@/styles/variables.less";
        `,
      },
    },
  },
  optimizeDeps: {
    include: [
      '@vue/runtime-core',
      '@vue/shared',
      'lodash-es',
      'ant-design-vue/es/locale/zh_CN',
      'ant-design-vue/es/locale/en_US',
    ],
  },
})
