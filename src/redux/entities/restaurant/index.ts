import { createSlice } from "@reduxjs/toolkit";
import { getRestaurants } from "./thunks/get-restaurants";
import { REQUEST_STATUSES } from "../../../constants/request-statuses";

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: {
    entities: {},
    ids: [],
    status: REQUEST_STATUSES.IDLE
  },
  extraReducers: builder =>
    builder
      .addCase(getRestaurants.pending,
      (state) => {
        state.status = REQUEST_STATUSES.PENDING;
      })
      .addCase(getRestaurants.fulfilled,
        (state, { payload }) => {

          state.entities = payload.reduce((acc, restaurant) => {
            acc[restaurant.id] = restaurant;
            return acc;
          }, {});

          state.ids = payload.map(({id}) => id);

          state.status = REQUEST_STATUSES.FULFILLED;
        }
      )
      .addCase(getRestaurants.rejected,
        (state) => {
          state.status = REQUEST_STATUSES.REJECTED;
        }
      )
})