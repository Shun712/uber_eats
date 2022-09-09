// 早い段階からなるべくファイル、関数を分離しておくことで管理しやすくする
import {REQUEST_STATE} from "../constants";

// export const ...のはこのオブジェクトをJavaScriptモジュールとして外部でも参照させるため
// もし同じファイル内でのみ参照するのであればexportは不要
export const initialState = {
    fetchState: REQUEST_STATE.INITIAL,
    restaurantsList: [],
}

export const restaurantsActionTypes = {
    FETCHING: 'FETCHING',
    FETCH_SUCCESS: 'FETCH_SUCCESS',
}

export const restaurantsReducer = (state, action) => {
    switch (action.type) {
        case restaurantsActionTypes.FETCHING:
            return {
                // 配列は...stateとする。
                ...state,
                fetchState: REQUEST_STATE.LOADING,
            };
        case restaurantsActionTypes.FETCH_SUCCESS:
            return {
                // fetchStateの変更と、payloadに渡したデータがrestaurantsListに入れられます。もちろんこれらのデータはstateに入る。
                fetchState: REQUEST_STATE.OK,
                restaurantsList: action.payload.restaurants,
            };
        default:
            throw new Error();
    }
}