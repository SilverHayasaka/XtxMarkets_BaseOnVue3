//封装业务数据相关代码
import {onMounted, ref} from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {getCategoryAPI} from "@/apis/category";

export function useCategory() {
    const categoryData = ref({});
    const route = useRoute();

    const getCategory = async (id = route.params.id) => {
        const res = await getCategoryAPI(id);
        categoryData.value = res.data.result;
    }

    onMounted(() => getCategory())

    onBeforeRouteUpdate((to) => {
        //使用最新路由参数
        getCategory(to.params.id)
    });

    return {
        categoryData
    }
}