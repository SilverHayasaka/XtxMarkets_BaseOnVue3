//定义懒加载

import {useIntersectionObserver} from "@vueuse/core";

export const lazyPlugin = {
    install(app) {
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
                    }
                )
            }
        })
    }

}