//管理用户数据相关
import {defineStore} from "pinia";
import {ref} from "vue";
import {loginAPI} from "@/apis/user";
import {useCartStore} from "@/stores/cartStore";
import {mergeCartAPI} from "@/apis/cart";

export const useUserStore = defineStore('user', () => {
        //定义管理用户数据的state
        const userInfo = ref({});
        const cartStore = useCartStore();
        //定义获取接口数据的 action函数
        const getUserInfo = async ({account, password}) => {
            const res = await loginAPI({account, password});
            userInfo.value = res.data.result;
            await mergeCartAPI(cartStore.cartList.map(item => {
                return {
                    skuId: item.skuId,
                    selected: item.selected,
                    count: item.count
                }
            }));
            cartStore.updateNewList();
        }

        //退出时清除用户信息
        const clearUserInfo = () => {
            userInfo.value = {};
            cartStore.clearCart();
        }

        //以对象的格式把state喝action return
        return {
            userInfo,
            clearUserInfo,
            getUserInfo
        }
    }, {
        persist: true,
    }
)