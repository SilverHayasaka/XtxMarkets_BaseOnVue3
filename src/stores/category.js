import {ref} from 'vue'
import {defineStore} from 'pinia'
import {getCategoryApi} from "@/apis/layout";

export const useCategoryStore = defineStore('counter', () => {
    //导航列表数据
    const categoryList = ref([]);

    //action获取导航数据的方法
    const getCategory = async () => {
        const res = await getCategoryApi();
        //console.log(res);
        categoryList.value = res.data.result;
    }

    return {
        categoryList,
        getCategory
    }
})
