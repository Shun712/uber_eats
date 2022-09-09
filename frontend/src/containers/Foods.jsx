import React, { Fragment, useEffect } from "react";

// api
import { fetchFoods } from "../apis/foods";

export const Foods = ({
    // matchオブジェクトを受け取る
    match
    }) => {
    useEffect(() => {
        // matchオブジェクトを通じてURLに含まれるidを取得
        fetchFoods(match.params.restaurantsId)
            .then((data) =>
                console.log(data)
            )
    }, [])

    return (
        <Fragment>
            フード一覧
        </Fragment>
    )
}
