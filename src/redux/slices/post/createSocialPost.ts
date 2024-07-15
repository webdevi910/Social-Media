import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Descendant } from 'slate';

// types
import { ICreateSocialPost } from 'src/@types/post';
import { Audience, PictureUrlInputType, VideoUrlInputType } from 'src/@types/sections/serverTypes';
import { ILocationSelect } from 'src/components/location/LocationSelect';
import { RootState } from 'src/redux/store';

// ----------------------------------------------------------------------

export const initialState: ICreateSocialPost = {
  audience: Audience.Public,
  gifs: '',
  location: null,
  picturesUrls: [],
  videoUrls: [],
  text: [
    {
      type: 'paragraph',
      children: [
        {
          text: '',
        },
      ],
    } as Descendant,
  ],
  editMode: false,
  id: '',
  currentPosition: [],
};

const slice = createSlice({
  name: 'createPost',
  initialState,
  reducers: {
    valuingAll(state, action: PayloadAction<ICreateSocialPost>) {
      state.audience = action.payload.audience;
      state.gifs = action.payload.gifs;
      state.location = action.payload.location;
      state.picturesUrls = action.payload.picturesUrls;
      state.videoUrls = action.payload.videoUrls;
      state.text = action.payload.text;
      state.editMode = action.payload.editMode;
      state.id = action.payload.id;
      state.currentPosition = action.payload.currentPosition;
    },
    setAudience(state, action: PayloadAction<Audience>) {
      state.audience = action.payload;
    },
    setText(state, action: PayloadAction<Descendant[]>) {
      state.text = action.payload;
    },
    setGifs(state, action: PayloadAction<string>) {
      state.gifs = action.payload;
    },
    setPicturesUrls(state, action: PayloadAction<PictureUrlInputType[]>) {
      state.picturesUrls = action.payload;
    },
    setVideosUrls(state, action: PayloadAction<VideoUrlInputType[]>) {
      state.videoUrls = action.payload;
    },
    setLocation(state, action: PayloadAction<ILocationSelect | null>) {
      state.location = action.payload;
    },
    setCurrentPosition(state, action: PayloadAction<number[]>) {
      state.currentPosition = action.payload;
    },
    reset(state) {
      state.audience = initialState.audience;
      state.gifs = initialState.gifs;
      state.location = initialState.location;
      state.picturesUrls = initialState.picturesUrls;
      state.videoUrls = initialState.videoUrls;
      state.text = initialState.text;
      state.editMode = initialState.editMode;
      state.id = initialState.id;
      state.currentPosition = initialState.currentPosition;
    },
  },
});

export const basicCreateSocialPostSelector = (state: RootState) =>
  <ICreateSocialPost>{
    audience: state.createSocialPost.audience,
    gifs: state.createSocialPost.gifs,
    location: state.createSocialPost.location,
    picturesUrls: state.createSocialPost.picturesUrls,
    videoUrls: state.createSocialPost.videoUrls,
    text: state.createSocialPost.text,
    editMode: state.createSocialPost.editMode,
    id: state.createSocialPost.id,
    currentPosition: state.createSocialPost.currentPosition,
  };

export const richTextEditorSelector = (state: RootState) =>
  <Descendant[]>[
    {
      type: 'paragraph',
      children: [
        {
          text: '',
        },
      ],
    } as Descendant,
  ];

export const getSocialPostAudience = (state: RootState) => <string>state.createSocialPost.audience;
export const getSocialPostCurrentPositions = (state: RootState) => <number[]>state.createSocialPost.currentPosition;

// Reducer
export default slice.reducer;

// Actions
export const {
  setAudience,
  setGifs,
  setLocation,
  setPicturesUrls,
  setVideosUrls,
  setText,
  valuingAll,
  reset,
  setCurrentPosition,
} = slice.actions;
