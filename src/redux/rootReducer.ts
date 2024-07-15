// redux
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
// slices
import authReducer from './slices/auth';
import chatReducer from './slices/chat';
import productReducer from './slices/product';
import createSocialPostReducer from './slices/post/createSocialPost';
import uploadReducer from './slices/upload';
// section slices
import userExperiencesReducer from './slices/profile/userExperiences-slice';
import userRelationShipReducer from './slices/profile/userRelationShip-slice';
import userLocationReducer from './slices/profile/userLocation-slice';
import userWebsitesReducer from './slices/profile/userWebsite-slice';
import userPhoneNumberReducer from './slices/profile/userPhoneNumber-slice';

import userCertificatesReducer from './slices/profile/userCertificates-slice';
import userCollegesReducer from './slices/profile/userColloges-slice';
import userUniversityReducer from './slices/profile/userUniversity-slice';
import userSchoolsReducer from './slices/profile/userSchool-slice';
import homePageReducer from './slices/homePage';
import userpersonSkillReducer from './slices/profile/userSkill-slice'
// api-reducers
import { reducers as cognitoApiReducers } from './COGNITO_APIs';
import { reducers as profileApiReducers } from './PROFILE_APIs';
import { reducers as localityApiReducers } from './LOCALITY_APIs';
import { reducers as uploadApiReducers } from './UPLOAD_APIs';
import { reducers as postApiReducers } from './POST_APIs';
// ----------------------------------------------------------------------

const createNoopStorage = () => ({
  getItem(_key: string) {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: any) {
    return Promise.resolve(value);
  },
  removeItem(_key: string) {
    return Promise.resolve();
  },
});

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  ...cognitoApiReducers,
  ...profileApiReducers,
  ...localityApiReducers,
  ...uploadApiReducers,
  ...postApiReducers,
  auth: authReducer,
  chat: chatReducer,
  userRelationShip: userRelationShipReducer,
  userLocation: userLocationReducer,
  userExperiences: userExperiencesReducer,
  userCertificates: userCertificatesReducer,
  userPersonSkill:userpersonSkillReducer,
  userWebsites: userWebsitesReducer,
  userPhoneNumber: userPhoneNumberReducer,
  userColleges: userCollegesReducer,
  userUniversity: userUniversityReducer,
  userSchools: userSchoolsReducer,
  product: persistReducer(productPersistConfig, productReducer),
  createSocialPost: createSocialPostReducer,
  homePage: homePageReducer,
  upload: uploadReducer,
});

export { rootPersistConfig, rootReducer };
