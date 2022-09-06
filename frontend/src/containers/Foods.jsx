import React, { Fragment } from "react";


export const Foods = ({
    // matchオブジェクトを受け取る
    match
    }) => {
    return (
        <Fragment>
            フード一覧
            {/* match.params.hogeのかたちでパラメーターを抽出する */}
            {/* http://localhost:3000/restaurants/1/foodsのようなURLを返す */}
            <p>
                restaurantsIdは{match.params.restaurantsId}です
            </p>
        </Fragment>
    )
}
