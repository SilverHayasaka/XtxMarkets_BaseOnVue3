//封装购物车模块
import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useCartStore = defineStore('cart', () => {
    const cartList = ref([]);
    //定义action
    const addCart = (goods) => {
        //添加购物车
        //已添加，count+1
        //未添加，push
        const item = cartList.value.find((item) => goods.skuId === item.skuId);
        if (item) {
            //找到了
            item.count++;
        } else {
            cartList.value.push(goods);
        }
    }

    const delCart = (skuId) => {
        const idx = cartList.value.findIndex((item) => skuId === item.skuId);
        if (cartList.value[idx].count > 1) cartList.value[idx].count--;
        else cartList.value.splice(idx, 1);
    }

    //单选功能
    const singleCheck = (skuId) => {
        const item = cartList.value.find((item) => skuId === item.skuId);
        item.selected = !item.selected;
    }

    const allCheck = () => {
        if (!isAll.value) {
            cartList.value.forEach((item) => {
                item.selected = true;
            })
        } else {
            cartList.value.forEach((item) => {
                item.selected = false;
            })
        }
    }

    const isAll = computed(() => cartList.value.every((item) => item.selected))

    //总数 计算count之和
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0));
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0));

    return {
        cartList,
        allCount,
        allPrice,
        isAll,
        singleCheck,
        allCheck,
        addCart,
        delCart
    }
}, {persist: true})