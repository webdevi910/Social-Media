import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// types
import { RootState } from 'src/redux/store';

// ----------------------------------------------------------------------

interface IInViewPortVideo {
  positionTop: number;
  link: string;
}
interface IHomePage {
  inViewPortVideos: IInViewPortVideo[];
  playingVieos: string[];
}

const initialState: IHomePage = {
  inViewPortVideos: [],
  playingVieos: [],
};

const slice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    //     addInViewPortVideo(state, action: PayloadAction<string>) {
    //       state.inViewPortVideo = [...state.inViewPortVideo, action.payload];
    //     },
    //     removeInViewPortVideo(state, action: PayloadAction<string>) {
    //       state.inViewPortVideo = state.inViewPortVideo.filter((i) => i !== action.payload);
    //     },
    addInViewPortVideo(state, action: PayloadAction<IInViewPortVideo>) {
      let newVideos = [...state.inViewPortVideos, action.payload];
      newVideos = newVideos.sort((a, b) => a.positionTop - b.positionTop);
      state.inViewPortVideos = [...newVideos];
    },
    removeInViewPortVideo(state, action: PayloadAction<string>) {
      state.inViewPortVideos = state.inViewPortVideos.filter((i) => i.link !== action.payload);
    },
    setPlayingVideo(state, action: PayloadAction<string>) {
      state.playingVieos = [...state.playingVieos, action.payload];
    },
    removePlayingVideo(state, action: PayloadAction<string>) {
      state.playingVieos = state.playingVieos.filter((i) => i !== action.payload);
    },
  },
});

export const getInViewPortVideos = (state: RootState) => <IInViewPortVideo[]>state.homePage.inViewPortVideos;
export const getPlayingVideos = (state: RootState) => <string[]>state.homePage.playingVieos;

// Reducer
export default slice.reducer;

// Actions
export const { addInViewPortVideo, removeInViewPortVideo, setPlayingVideo, removePlayingVideo } = slice.actions;
