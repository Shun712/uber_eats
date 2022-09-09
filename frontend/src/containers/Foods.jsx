import React, { Fragment, useEffect, useReducer } from "react";

// reducers
import {
    // 「initialState」と定義されているmoduleをこのファイルでは「foodsInitialState」としてimportする
    // 後ほどinitialStateが登場するため
    initialState as foodsInitialState,
    foodsActionTypes,
    foodsReducer,
} from "../reducers/foods";

// api
import { fetchFoods } from "../apis/foods";

// constants
import { REQUEST_STATE } from "../constants";

export const Foods = ({
    // matchオブジェクトを受け取る
    match
    }) => {
    const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);

    useEffect(() => {
        dispatch({ type: foodsActionTypes.FETCHING });
        // matchオブジェクトを通じてURLに含まれるidを取得
        fetchFoods(match.params.restaurantsId)
            .then((data) => {
                dispatch({
                    type: foodsActionTypes.FETCH_SUCCESS,
                    payload: {
                        foods: data.foods

                }
            });
        })
    }, [])

    return (
        <Fragment>
            {
                foodsState.fetchState === REQUEST_STATE.LOADING ?
                    <Fragment>
                        <p>
                            ロード中...
                        </p>
                    </Fragment>
                    :
                    foodsState.foodsList.map(food =>
                        <div key={food.id}>
                            {food.name}
                        </div>
                    )
            }
        </Fragment>
    )
}
