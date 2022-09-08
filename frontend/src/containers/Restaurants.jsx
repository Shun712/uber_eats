import React, {Fragment, useReducer, useEffect} from "react";

// npmでインストールしたstyled-componentsを使うことができる
import styled from 'styled-components';

// api
import {fetchRestaurants} from "../apis/restaurants";


// reducers
import {
    initialState,
    restaurantsActionTypes,
    restaurantsReducer,
    } from '../reducers/resutaurants';


// images
import MainLogo from '../images/logo.png';
import MainCoverImage from '../images/main-cover-image.png';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`

const MainCoverImageWrapper = styled.div`
  text-align: center;
`;

const MainCover = styled.img`
  height: 600px;
`;

export const Restaurants = () => {
    // stateは現在の状態、dispatchは更新関数
    // restaurantsState、restaurantsDispatchと命名も可
    const [state, dispatch] = useReducer(restaurantsReducer, initialState);

    useEffect(() => {
        dispatch({ type: restaurantsActionTypes.FETCHING });
        fetchRestaurants()
            .then((data) =>
                dispatch({
                  type: restaurantsActionTypes.FETCH_SUCCESS,
                  //  payloadとは通信に含まれるデータのことを「ペイロードデータ」ということから
                  payload: {
                      restaurants: data.restaurants
                  }
                })
            )
    }, [])

    return (
        <Fragment>
            <HeaderWrapper>
                <MainLogoImage src={MainLogo} alt="main logo" />
            </HeaderWrapper>
            <MainCoverImageWrapper>
                <MainCover src={MainCoverImage} alt="main cover" />
            </MainCoverImageWrapper>
            {
                state.restaurantsList.map(restaurant =>
                <div key={restaurant.id}>
                    {restaurant.name}
                </div>
                )
            }
        </Fragment>
    )
}
