import axios from "axios";
// URLの文字列をimportする
import {restaurantsIndex} from "../urls/index";

export const fetchRestaurants =() => {
    // 今回はGETリクエストなのでaxios.get()
    // POSTであれば、axios.post()
    // axios.getの引数には文字列が必要で、HTTPリクエストをなげる先のURL文字列が必要になる(restaurantsIndex)
    // axiosはPromiseベースであること、です。つまりaxiosを使う側でnew Promiseなどしなくても、非同期処理を実装することができる
    return axios.get(restaurantsIndex)
        .then(res => {
            return res.data
        })
        .catch((e) => console.error(e))
}
