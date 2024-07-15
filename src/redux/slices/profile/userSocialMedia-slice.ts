import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';
import { AudienceEnum, UserSocialMedia } from 'src/@types/sections/serverTypes';
import { PersonSocialMediaType,ProfileSocialMediasState } from 'src/@types/sections/profile/userSocialMedia';

const initialState: ProfileSocialMediasState = {
    socialMedias:[],
    // socialMedia:{}
}


const slice = createSlice({
    name:'userSocialMedias',
    initialState,
    reducers: {
        addedSocialMedia(state, action: PayloadAction<PersonSocialMediaType>){
                // state.socialMedias = [...state.socialMedias, ...action.payload];
                state.socialMedia = action.payload;
              
        },
    }
})

export const userSocialMediasSelector = (state: RootState) => state.userSocialMedias.socialMedia;

// Reducer
export default slice.reducer;

// Actions
export const { addedSocialMedia } = slice.actions;