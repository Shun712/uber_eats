import axios from 'axios';
import { foodsIndex} from "../urls/index";

// foodsIndex() にレストランのidを渡すということは、APIを叩く関数fetchFoods() にもそれを与えないといけない
export const fetchFoods = (restaurantId) => {
    return axios.get(foodsIndex(restaurantId))
        .then(res => {
            return res.data
        })
        .catch((e) => console.log(e))
}