// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';

const ROOTS_APP = '/';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  signIn: path(ROOTS_AUTH, '/sign-in'),
  signUp: {
    root: path(ROOTS_AUTH, '/sign-up'),
    typeSelection: path(ROOTS_AUTH, '/sign-up/type-selection'),
    basicInfo: path(ROOTS_AUTH, '/sign-up/basic-info'),
    advancedInfo: path(ROOTS_AUTH, '/sign-up/advanced-info'),
    verification: path(ROOTS_AUTH, '/sign-up/verification'),
  },
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify'),
};

export const PATH_APP = {
  root: ROOTS_APP,
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  page404: '/404',
  page500: '/500',
  chat: {
    root: path(ROOTS_APP, '/chat'),
    new: path(ROOTS_APP, '/chat/new'),
    conversation: path(ROOTS_APP, '/chat/:conversationKey'),
  },
  user: {
    root: path(ROOTS_APP, '/user'),
    profile: path(ROOTS_APP, '/user/profile'),
    cards: path(ROOTS_APP, '/user/cards'),
    list: path(ROOTS_APP, '/user/list'),
    newUser: path(ROOTS_APP, '/user/new'),
    editById: path(ROOTS_APP, `/user/reece-chung/edit`),
    account: path(ROOTS_APP, '/user/account'),
  },
  home:{
    index:'/'
  },
  post: {
    createPost: {
      socialPost: {
        index: '/post/social-post/create',
        addLocation: '/post/social-post/add-location',
        addGif:'/add-gif'
      },
    },
  },
};
