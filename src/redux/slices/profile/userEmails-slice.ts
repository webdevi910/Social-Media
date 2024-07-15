import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';
import { AudienceEnum, UserEmail } from 'src/@types/sections/serverTypes';
import { PersonEmailType, ProfileEmailsState } from 'src/@types/sections/profile/userEmails';

const initialState: ProfileEmailsState = {
 emails: [],
//   email: {},
};

const slice = createSlice({
  name: 'userEmails',
  initialState,
  reducers: {
    addedEmail(state, action: PayloadAction<PersonEmailType>) {
      // state.emails = { ...state.email, ...action.payload };
      state.email = action.payload;
    },

    
  },
});

export const userEmailsSelector = (state: RootState) => state.userEmails.email;

// Reducer
export default slice.reducer;

// Actions
export const { addedEmail } = slice.actions;