import { RootState } from 'src/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserCollegeType , profileCollegeState } from 'src/@types/sections/profile/userColleges';
import { AudienceEnum } from 'src/@types/sections/serverTypes';


const initialState :profileCollegeState={
    // colleges:[],
    // university:{
    //     audience:AudienceEnum.Public
    // }
}

const slice = createSlice({
    name: 'userUniversity',
    initialState,
    reducers: {
        userUniversityUpdated(state,action:PayloadAction<UserCollegeType>){
            state.university={...state.university,...action.payload}
        },
        emptyUniversity(state,action:PayloadAction<UserCollegeType>){
            state.university=action.payload
        }
    },
  });

  export const userUniversitySelector = (state: RootState) => state.userUniversity.university;
// Reducer
  export default slice.reducer;
  // Actions
  export const { userUniversityUpdated ,emptyUniversity } = slice.actions;