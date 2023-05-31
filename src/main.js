//引入初始化样式
import '@/styles/common.scss'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {useIntersectionObserver} from "@vueuse/core";

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

//定义全局指令
app.directive('img-lazy',{
    mounted(el,binding){
        //el指定绑定元素
        //binding:binding.value指定表达式的值 此处表示图片url
        const { stop } = useIntersectionObserver(
            el,
            ([{ isIntersecting }]) => {
                //console.log(isIntersecting)
                if (isIntersecting) {
                    // 进入视口区域
                    el.src = binding.value;
                    stop();
                }
            },
        )
    }
})