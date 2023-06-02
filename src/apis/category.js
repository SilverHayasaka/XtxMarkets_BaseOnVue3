//同httpInstance,只有一个默认导出可以用别名
import request from "@/utils/http";

export function getCategoryAPI(id) {
    return request({
        url: '/category',
        params: {
            id
        }
    })
}