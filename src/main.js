import { createApp } from 'vue'
import App from './App.vue'
import routerApp from './router';
// import "ant-design-vue/dist/antd.less"
import Antd from 'ant-design-vue/es';
import 'ant-design-vue/dist/antd.less';
import '@/styles/index.less';
//import '@/assets/style/common.less';
//import '@/styles/reset.css';
import 'remixicon/fonts/remixicon.css'


const app = createApp(App);
//app.component('Antd', Antd);
app.use(Antd)
app.use(routerApp);
app.mount('#app');

