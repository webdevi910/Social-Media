import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// types
import { ProfileExperiencesState } from 'src/@types/sections/profile/userExperiences';
import { AudienceEnum, Experience } from 'src/@types/sections/serverTypes';
import { RootState } from 'src/redux/store';

// ----------------------------------------------------------------------

const initialState: ProfileExperiencesState = {};

const slice = createSlice({
  name: 'userExperiences',
  initialState,
  reducers: {
    experienceAdded(state, action: PayloadAction<Experience>) {
      state.experience = { ...state.experience, ...action.payload };
    },
    emptyExperience(state, action: PayloadAction<Experience>) {
      state.experience = action.payload
    },
  },
});

export const userExperienceSelector = (state: RootState) => state.userExperiences.experience;

// Reducer
export default slice.reducer;

// Actions
export const { experienceAdded, emptyExperience } = slice.actions;
