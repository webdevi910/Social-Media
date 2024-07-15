import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// types
import { userWebsiteState, PersonWebSiteType } from 'src/@types/sections/profile/userWebsite';
import { RootState } from 'src/redux/store';
import { AudienceEnum } from 'src/@types/sections/serverTypes';

const initialState: userWebsiteState = {};

const slice = createSlice({
  name: 'userWebsites',
  initialState,
  reducers: {
    websiteAdded(state, action: PayloadAction<PersonWebSiteType>) {
      state.website = action.payload;
    },
  },
});

export const userWebsiteSelector = (state: RootState) => state.userWebsites.website;

// Actions
export const { websiteAdded } = slice.actions;

// Reducer
export default slice.reducer;
