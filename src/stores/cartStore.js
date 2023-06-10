//封装购物车模块
import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {useUserStore} from "@/stores/userStore";
import {insertCartAPI, findNewCartList, delCartAPI} from "@/apis/cart";

export const useCartStore = defineStore('cart', () => {
    const cartList = ref([]);
    const userStore = useUserStore();
    const isLogin = computed(() => userStore.userInfo.token);

    //定义action
    const addCart = async (goods) => {
        const {skuId, count} = goods;
        if (isLogin.value) {
            await insertCartAPI({skuId, count});
            updateNewList();
        } else {
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

    }

    const delCart = async (skuId) => {
        if (isLogin.value) {
            await delCartAPI([skuId]);
            updateNewList();
        }
        const idx = cartList.value.findIndex((item) => skuId === item.skuId);
        if (cartList.value[idx].count > 1) cartList.value[idx].count--;
        else cartList.value.splice(idx, 1);
    }

    const updateNewList = async () => {
        if (isLogin.value) {
            const res = await findNewCartList();
            cartList.value = res.data.result;
        }
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

    const clearCart = () => {
        cartList.value = [];
    }

    const isAll = computed(() => cartList.value.every((item) => item.selected))

    //总数 计算count之和
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0));
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0));

    //已选择数量
    const selectedCount = computed(() => cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count, 0));
    const selectedPrice = computed(() => cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count * c.price, 0));

    return {
        cartList,
        allCount,
        allPrice,
        selectedCount,
        selectedPrice,
        isAll,
        singleCheck,
        allCheck,
        addCart,
        delCart,
        clearCart,
        updateNewList
    }
}, {persist: true})