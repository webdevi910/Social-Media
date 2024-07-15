import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { color } from '@mui/system';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { Audience, PictureUrlInputType, PostStatus, VideoUrlInputType } from 'src/@types/sections/serverTypes';
import ConfirmDialog from 'src/components/dialogs/ConfirmDialog';
import MentionExample from 'src/components/textEditor';
import GolUploader, { IMediaProps, LimitationType } from 'src/components/upload/GolUploader';
import {
  basicCreateSocialPostSelector,
  setAudience,
  setLocation,
  setPicturesUrls,
  setVideosUrls,
} from 'src/redux/slices/post/createSocialPost';
import { getUploadingFiles } from 'src/redux/slices/upload';
import { useDispatch, useSelector } from 'src/redux/store';
import { PATH_APP } from 'src/routes/paths';
import { getFileInputsInformations } from 'src/utils/fileFunctions';
import { useCreateSocialPostMutation } from 'src/_requests/graphql/post/create-post/mutations/createSocialPost.generated';
import Media from '../../Media';
import CreatePostMainFotter from './CreatePostMainFootter';
import CreatePostMainHeader from './CreatePostMainHeader';
const SimpleMap = dynamic(() => import('src/components/map/SimpleMap'), { ssr: false });
import { v4 as uuidv4 } from 'uuid';
import { useUpdateSocialPostMutation } from 'src/_requests/graphql/post/create-post/mutations/updateSocialPost.generated';
import { toast } from 'react-toastify';
import { FILELIMITATION } from 'src/config';

const UserFullNameStyle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  lineHeight: '22.5px',
  fontSize: '18px',
  color: theme.palette.grey[900],
}));

const ViewrTextStyle = styled(Typography)(({ theme }) => ({
  fontWeight: 300,
  fontSize: 14,
  lineHeight: '17.5px',
  color: theme.palette.grey[900],
}));

const ViewerButtonStyle = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(1),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 32,
  width: 'fit-content',
}));

const MapWrapper = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[100]}`,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

const MapRemoveIconWrapper = styled(Stack)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  cursor: 'pointer',
}));

const SelectedLocationStyle = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '17.5px',
  color: theme.palette.text.secondary,
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
}));

const SocialPostCreateDialog: FC = () => {
  const dispatch = useDispatch();
  const post = useSelector(basicCreateSocialPostSelector);
  const uploadingFiles = useSelector(getUploadingFiles);
  const [startUpload, setStartUpload] = useState<boolean>(false);
  const [createPostRequest] = useCreateSocialPostMutation();
  const [updatePostRequest] = useUpdateSocialPostMutation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const [media, setMedia] = useState<IMediaProps[]>([]);
  const [removingUniqueId, setRemovingUniqueId] = useState<string>('');
  const [showRemoveMap, setShowRemoveMap] = useState<boolean>(false);
  const [creatingLoading, setCreatingLoading] = useState<boolean>(false);
  const [firstInitializeForUpdate, setFirstInitializeForUpdate] = useState<boolean>(false);
  const [fileLimitationError, setFileLimitationError] = useState<LimitationType>('');
  const { replace } = useRouter();
  const listOfTag: any = [];
  const listOfMention: any = [];

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (post.gifs) {
      console.log(post.gifs);
      setMedia([...media, { link: post.gifs, previewLink: '', type: 'image', uniqueId: uuidv4() }]);
    }
  }, [post.gifs]);

  useEffect(() => {
    console.log(media);
  }, []);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeMedia = (uniqueId: string) => {
    if (post.editMode) {
      removeMediaForEditMode(uniqueId);
    }
    setRemovingUniqueId(uniqueId);
  };

  const removeMediaForEditMode = (uniqueId: string) => {
    const removingIndex = media.findIndex((i) => i.uniqueId === uniqueId);
    if (removingIndex >= 0) {
      const lastMedia = [...media];
      const removingPictureMedia = [...post.picturesUrls.filter((i) => i.url !== lastMedia[removingIndex].link)];
      dispatch(setPicturesUrls(removingPictureMedia));
      const removingVideoMedia = [...post.videoUrls.filter((i) => i.url !== lastMedia[removingIndex].link)];
      dispatch(setVideosUrls(removingVideoMedia));
      lastMedia.splice(removingIndex, 1);
      setMedia([...lastMedia]);
    }
  };

  const audienceChanged = (audience: Audience) => {
    dispatch(setAudience(audience));
    handleClose();
  };

  useEffect(() => {
    if (post.editMode && !firstInitializeForUpdate) {
      valuingMediaForUpdate();
      setFirstInitializeForUpdate(true);
    }
  }, [post]);

  const valuingMediaForUpdate = () => {
    const newMedia: IMediaProps[] = [];
    post.picturesUrls.map((picture) => {
      newMedia.push({ link: picture.url!, type: 'image', uniqueId: uuidv4(), previewLink: '' });
    });
    post.videoUrls.map((video) => {
      newMedia.push({ link: video.url!, type: 'video', uniqueId: uuidv4(), previewLink: '' });
    });

    setMedia([...newMedia]);
  };

  const createPostOrupdatePost = (imageLinks?: PictureUrlInputType[], videoLinks?: VideoUrlInputType[]) => {
    if (post.editMode) {
      updatePost(imageLinks, videoLinks);
    } else {
      createPost(imageLinks, videoLinks);
    }
  };

  const setLinks = (links: IMediaProps[]) => {
    const videoLinks: VideoUrlInputType[] = [];
    const imageLinks: PictureUrlInputType[] = [];
    links.map((link) => {
      if (link.type === 'video') {
        videoLinks.push({ isDefault: false, url: link.link });
      }
      if (link.type === 'image') {
        imageLinks.push({ isDefault: false, url: link.link, altImage: '' });
      }
    });

    // dispatch(setPicturesUrls(imageLinks));
    // dispatch(setVideosUrls(videoLinks));

    createPostOrupdatePost(imageLinks, videoLinks);
  };

  const createPost = (imageLinks?: PictureUrlInputType[], videoLinks?: VideoUrlInputType[]) => {
    createPostRequest({
      post: {
        dto: {
          audience: post.audience,
          body: post.text || 'text',
          placeId: post.location && post.location.id ? post.location.id : '',
          mentionedUserIds: [],
          tagIds: [],
          pictureUrls: imageLinks ? imageLinks : [],
          videoUrls: videoLinks ? videoLinks : [],
          status: PostStatus.Show,
        },
      },
    })
      .unwrap()
      .then((res) => {
        // console.log(res);
        setCreatingLoading(false);
        replace(PATH_APP.home.index);
      })
      .catch((err) => {
        toast.error(err.message);
        replace(PATH_APP.home.index);
        setCreatingLoading(false);
      });
  };

  const updatePost = (imageLinks?: PictureUrlInputType[], videoLinks?: VideoUrlInputType[]) => {
    const pictureUrls: PictureUrlInputType[] = [
      ...media
        .filter((i) => i.type === 'image' && i.link)
        .map((picture) => ({
          altImage: '',
          isDefault: false,
          url: picture.link,
        })),
      ...(imageLinks ? imageLinks : []),
    ];

    const videoUrls: VideoUrlInputType[] = [
      // ...media.filter((i) => i.type === 'video' && i.link).map((video) => ({ isDefault: false, url: video.link })),
      ...media.filter((i) => i.type === 'video').map((video) => ({ isDefault: false, url: video.link })),
      ...(videoLinks ? videoLinks : []),
    ];

    updatePostRequest({
      socialPost: {
        dto: {
          audience: post.audience,
          body: post.text || 'text',
          placeId: post.location && post.location.id ? post.location.id : '',
          mentionedUserIds: [],
          tagIds: [],
          pictureUrls,
          videoUrls,
          status: PostStatus.Show,
          id: post.id,
        },
      },
    })
      .unwrap()
      .then((res) => {
        console.log(res);
        setCreatingLoading(false);
        replace(PATH_APP.home.index);
      })
      .catch((err) => {
        toast.error(err.message);
        replace(PATH_APP.home.index);
        setCreatingLoading(false);
      });
  };

  const checkCountOfMedia = () => {
    let imageMediaCount = 0;
    let videoMediaCount = 0;

    uploadingFiles.map((file) => {
      if (file.type === 'image') {
        imageMediaCount++;
      } else if (file.type === 'video') {
        videoMediaCount++;
      }
    });

    if (imageMediaCount > FILELIMITATION.imageCount) {
      setFileLimitationError('imageCount');
      return false;
    } else if (videoMediaCount > FILELIMITATION.videoCount) {
      setFileLimitationError('videoCount');
      return false;
    }
    return true;
  };

  const startPost = () => {
    const mediaCountStatus = checkCountOfMedia();
    if (!mediaCountStatus) {
      return;
    }
    setCreatingLoading(true);
    if (uploadingFiles.length > 0) {
      setStartUpload(true);
    } else {
      createPostOrupdatePost();
    }
  };

  const uploadError = (error: LimitationType) => {
    setFileLimitationError(error);
  };

  return (
    <Dialog maxWidth="lg" fullWidth open={true} aria-labelledby="responsive-dialog-title">
      <DialogTitle sx={{ padding: 0 }} id="responsive-dialog-title">
        <CreatePostMainHeader />
      </DialogTitle>
      <DialogContent sx={{ height: 536, marginTop: 2, padding: 2 }}>
        <Stack spacing={2} direction="row">
          <Stack sx={{ height: 'inherit' }}>
            <Avatar sx={{ width: 48, height: 48 }} />
          </Stack>
          <Stack spacing={1}>
            <Stack spacing={1} direction="row">
              <UserFullNameStyle variant="h6">Ardalan Rezaie</UserFullNameStyle>
              {post.location && post.location.id && (
                <Stack justifyContent="center">
                  <Image src="/icons/dot.svg" width={5} height={5} alt="selected-location" />
                </Stack>
              )}
              {post.location && post.location.id && (
                <Stack sx={{ flex: 1 }} spacing={0.5} direction="row" alignItems="center" flexWrap="nowrap">
                  <Box sx={{ minWidth: 16, minHeight: 16 }}>
                    <Image src="/icons/location/location.svg" width={16} height={16} alt="selected-location" />
                  </Box>
                  <SelectedLocationStyle variant="subtitle2">{post.location.address}</SelectedLocationStyle>
                </Stack>
              )}
            </Stack>
            <ViewerButtonStyle
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Stack justifyContent="center">
                  <Image src="/icons/location/global.svg" width={20} height={20} alt="post-viewers" />
                </Stack>
                <ViewrTextStyle variant="body2">{post.audience}</ViewrTextStyle>
                <Stack justifyContent="center">
                  <Image src="/icons/arrow/arrow-down.svg" width={20} height={20} alt="post-viewers" />
                </Stack>
              </Stack>
            </ViewerButtonStyle>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => audienceChanged(Audience.Public)}>{Audience.Public}</MenuItem>
              <MenuItem onClick={() => audienceChanged(Audience.Private)}> {Audience.Private}</MenuItem>
              <MenuItem onClick={() => audienceChanged(Audience.Ngo)}>{Audience.Ngo}</MenuItem>
              <MenuItem onClick={() => audienceChanged(Audience.Friends)}>{Audience.Friends}</MenuItem>
            </Menu>
          </Stack>
        </Stack>
        <MentionExample listOfTag={listOfTag} listOfMention={listOfMention} />
        <Box sx={{ marginTop: 3 }}>
          <Media media={media} removeMedia={!creatingLoading ? removeMedia : undefined} />
        </Box>
        {!post.text &&
          post.picturesUrls.length === 0 &&
          post.videoUrls.length === 0 &&
          uploadingFiles.length === 0 &&
          post.location &&
          post.location.id && (
            <MapWrapper>
              <MapRemoveIconWrapper
                onClick={() => setShowRemoveMap(true)}
                alignItems="flex-end"
                justifyContent="center"
              >
                <Image src="/icons/Close/24/Outline.svg" width={24} height={24} />
              </MapRemoveIconWrapper>
              <SimpleMap center={[51.505, -0.09]} markerPosition={[51.505, -0.09]} zoom={13} />
            </MapWrapper>
          )}

        <GolUploader
          uploadeError={uploadError}
          uploadedLinkAdded={setLinks}
          previewLinksAdded={(previews) => {
            if (post.editMode) {
              setMedia([...media, ...previews]);
            } else {
              setMedia([...media, ...previews]);
            }
          }}
          linkRemoved={(link) => {
            setMedia([...media.filter((i) => i.uniqueId !== link.uniqueId)]);
          }}
          accept={['image/*', 'video/*']}
          removingUniqueId={removingUniqueId}
          uploadStart={startUpload}
          variant="withOutUi"
          showInput={showUpload}
        />
      </DialogContent>
      <DialogActions sx={{ padding: '0!important' }}>
        <CreatePostMainFotter
          okLimitationClicked={() => setFileLimitationError('')}
          limitationError={fileLimitationError}
          loading={creatingLoading}
          startPosting={() => {
            // setStartUpload(true);
            startPost();
          }}
          addImage={() => {
            setShowUpload(true);
            setTimeout(() => {
              setShowUpload(false);
            }, 10);
          }}
        />
      </DialogActions>

      <ConfirmDialog
        confirmText="Are you sure for remove this location?"
        actionButtonText="Approve"
        open={showRemoveMap}
        onClose={() => setShowRemoveMap(false)}
        titleText="Remove Location"
        confirm={() => dispatch(setLocation(null))}
      />
    </Dialog>
  );
};

export default SocialPostCreateDialog;
