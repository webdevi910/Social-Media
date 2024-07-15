import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { ProfilePublicDetailsState } from 'src/@types/sections/profile/publicDetails';
import { AudienceEnum, Relationship, RelationshipStatus } from 'src/@types/sections/serverTypes';
// types
import { RootState } from 'src/redux/store';

const initialState: ProfilePublicDetailsState = {};

const slice = createSlice({
  name: 'userRelationShip',
  initialState,
  reducers: {
    userRelationShipUpdate(state, action: PayloadAction<Relationship>) {
      state.relationShip = action.payload;
    },
  },
});
// useSelector(userRelationShipSelector)
export const userRelationShipSelector = (state: RootState) => state.userRelationShip.relationShip;

// Reducer
export default slice.reducer;

// Actions
export const { userRelationShipUpdate } = slice.actions;
