import { RootState } from 'src/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSchoolType , profileSchoolState } from 'src/@types/sections/profile/userSchools';
// import { AudienceEnum } from 'src/@types/sections/serverTypes';


const initialState :profileSchoolState={
    // school:{
    //     audience:AudienceEnum.Public
    // },
}

const slice = createSlice({
    name: 'userSchools',
    initialState,
    reducers: {
        userSchoolUpdated(state,action:PayloadAction<UserSchoolType>){
            state.school={...state.school,...action.payload}
        },
        schoolWasEmpty(state,action:PayloadAction<UserSchoolType>){
            state.school=action.payload
        },
    },
  });

  export const userSchoolsSelector = (state: RootState) => state.userSchools.school;
// Reducer
  export default slice.reducer;
  // Actions
  export const { userSchoolUpdated ,schoolWasEmpty } = slice.actions;