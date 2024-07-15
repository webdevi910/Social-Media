import {
  Avatar,
  Box,
  Button,
  InputBase,
  Menu,
  MenuItem,
  Stack,
  styled,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { Audience, PictureUrlInputType, PostStatus, VideoUrlInputType } from 'src/@types/sections/serverTypes';
import Image from 'next/image';
import { useDispatch, useSelector } from 'src/redux/store';
import {
  basicCreateSocialPostSelector,
  setAudience,
  setLocation,
  setPicturesUrls,
  setVideosUrls,
} from 'src/redux/slices/post/createSocialPost';
import { getUploadingFiles } from 'src/redux/slices/upload';
import { useCreateSocialPostMutation } from 'src/_requests/graphql/post/create-post/mutations/createSocialPost.generated';
import { useUpdateSocialPostMutation } from 'src/_requests/graphql/post/create-post/mutations/updateSocialPost.generated';
import GolUploader, { IMediaProps, LimitationType } from 'src/components/upload/GolUploader';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { PATH_APP } from 'src/routes/paths';
import ConfirmDialog from 'src/components/dialogs/ConfirmDialog';
import dynamic from 'next/dynamic';
const SimpleMap = dynamic(() => import('src/components/map/SimpleMap'), { ssr: false });
import { toast } from 'react-toastify';
import Media from 'src/sections/post/Media';
import CreatePostMainHeader from 'src/sections/post/create-post/social-post/CreatePostMainHeader';
import CreatePostMainFootter from 'src/sections/post/create-post/social-post/CreatePostMainFootter';
import { FILELIMITATION } from 'src/config';
import WarnDialog from 'src/components/dialogs/WarnDialog';
import MentionExample from 'src/components/textEditor';

const UserFullNameStyle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  lineHeight: '22.5px',
  fontSize: '18px',
  color: theme.palette.grey[900],
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

const ViewerButtonStyle = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(1),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 32,
  width: 'fit-content',
}));

const ViewrTextStyle = styled(Typography)(({ theme }) => ({
  fontWeight: 300,
  fontSize: 14,
  lineHeight: '17.5px',
  color: theme.palette.grey[900],
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

const CreatePostHome: NextPage = () => {
  const dispatch = useDispatch();
  const post = useSelector(basicCreateSocialPostSelector);
  const uploadingFiles = useSelector(getUploadingFiles);
  const [startUpload, setStartUpload] = useState<boolean>(false);
  const [createPostRequest] = useCreateSocialPostMutation();
  const [updatePostRequest] = useUpdateSocialPostMutation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const [media, setMedia] = useState<IMediaProps[]>([]);
  const mediaRef = useRef(media);
  const [removingUniqueId, setRemovingUniqueId] = useState<string>('');
  const [showRemoveMap, setShowRemoveMap] = useState<boolean>(false);
  const [creatingLoading, setCreatingLoading] = useState<boolean>(false);
  const [firstInitializeForUpdate, setFirstInitializeForUpdate] = useState<boolean>(false);
  const { replace, push } = useRouter();
  const listOfTag: any = [];
  const listOfMention: any = [];
  const [fileLimitationError, setFileLimitationError] = useState<LimitationType>('');
  const [listOfRichs, setListOfRichs] = useState([]);

  const open = Boolean(anchorEl);
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
      mediaRef.current = [...lastMedia];
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
  let postText = '';

  listOfRichs.map((item) => {
    item.children &&
      item?.children.map &&
      item.children.map((obj: any) => {
        console.log(obj.fullname);
        if (obj.type) {
          obj.type === 'tag' ? listOfTag.push(obj.id) : obj.type === 'mention' ? listOfMention.push(obj.id) : null;
        }
        obj.text
          ? (postText += obj.text)
          : obj.type === 'tag'
          ? (postText += `#${obj.title}`)
          : obj.type === 'mention'
          ? (postText += `╣${obj.fullname}╠`)
          : (postText += ' ');
      });
    if (listOfRichs.length > 1) {
      postText += '\\n';
    }
  });

  useEffect(() => {
    if (post.gifs) {
      setMedia([...media, { link: post.gifs, previewLink: '', type: 'gif', uniqueId: uuidv4() }]);
    }
  }, [post.gifs]);

  const valuingMediaForUpdate = () => {
    const newMedia: IMediaProps[] = [];
    post.picturesUrls.map((picture) => {
      newMedia.push({ link: picture.url!, type: 'image', uniqueId: uuidv4(), previewLink: '' });
    });
    post.videoUrls.map((video) => {
      newMedia.push({ link: video.url!, type: 'video', uniqueId: uuidv4(), previewLink: '' });
    });

    setMedia([...newMedia]);
    mediaRef.current = [...newMedia];
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

  const convertSlateValueToText = () => {
    let text = '';
    post.text.map((item: any) => {
      item.children &&
        item?.children.map &&
        item.children.map((obj: any) => {
          if (obj.type) {
            obj.type === 'tag' ? listOfTag.push(obj.id) : obj.type === 'mention' ? listOfMention.push(obj.id) : null;
          }
          obj.text
            ? (text += obj.text)
            : obj.type === 'tag'
            ? (text += `#${obj.title}`)
            : obj.type === 'mention'
            ? (text += `╣${obj.username}╠`)
            : (text += ' ');
        });
      text += '\\n';
    });
    return text;
  };

  const createPost = (imageLinks?: PictureUrlInputType[], videoLinks?: VideoUrlInputType[]) => {
    const gifIndex = media.findIndex((i) => i.type === 'gif');

    createPostRequest({
      post: {
        dto: {
          audience: post.audience,
          body: convertSlateValueToText(),
          placeId: post.location && post.location.id ? post.location.id : '',
          mentionedUserIds: listOfMention,
          tagIds: listOfTag,
          pictureUrls:
            gifIndex >= 0
              ? [{ isDefault: false, url: media[gifIndex].link, altImage: '' }]
              : imageLinks
              ? imageLinks
              : [],
          videoUrls: videoLinks ? videoLinks : [],
          status: PostStatus.Show,
        },
      },
    })
      .unwrap()
      .then((res) => {
        setCreatingLoading(false);
        replace(PATH_APP.home.index);
      })
      .catch((err: any) => {
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
      ...media.filter((i) => i.type === 'video').map((video) => ({ isDefault: false, url: video.link })),
      ...(videoLinks ? videoLinks : []),
    ];

    updatePostRequest({
      socialPost: {
        dto: {
          audience: post.audience,
          body: convertSlateValueToText(),
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

    if (post.editMode) {
      media.forEach((value) => {
        if (value.type === 'image' && value.link) imageMediaCount++;
        else if (value.type === 'video' && value.link) videoMediaCount++;
      });
    }

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

  const audienctTypeToString = (audience: Audience) => {
    switch (audience) {
      case Audience.Followers:
        return 'Followers';
      case Audience.FollowersExcept:
        return 'Followers except';
      case Audience.OnlyMe:
        return 'Only me';
      case Audience.Public:
        return 'Public';
      case Audience.SpecificFollowers:
        return 'Specific Followers';
      default:
        return '';
    }
  };

  return (
    <>
      <CreatePostMainHeader
        loading={creatingLoading}
        startPosting={() => {
          // setStartUpload(true);
          startPost();
        }}
        media={media}
      />
      <Stack
        sx={{
          minHeight: 'calc(100vh - 120px)',
          maxHeight: 'calc(100vh - 120px)',
          padding: 2,
          overflowY: 'auto',
        }}
      >
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
                  <SelectedLocationStyle
                    onClick={() => push(PATH_APP.post.createPost.socialPost.addLocation)}
                    variant="subtitle2"
                  >
                    {post.location.address}
                  </SelectedLocationStyle>
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
                <ViewrTextStyle variant="body2">{audienctTypeToString(post.audience)}</ViewrTextStyle>
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
              <MenuItem onClick={() => audienceChanged(Audience.Public)}>Public</MenuItem>
              <MenuItem onClick={() => audienceChanged(Audience.OnlyMe)}> Only me</MenuItem>
              <MenuItem onClick={() => audienceChanged(Audience.Followers)}>Followers</MenuItem>
              <MenuItem onClick={() => audienceChanged(Audience.SpecificFollowers)}>Specific Followers</MenuItem>
              <MenuItem onClick={() => audienceChanged(Audience.FollowersExcept)}>Followers except</MenuItem>
            </Menu>
          </Stack>
        </Stack>

        <MentionExample setListOfRichs={setListOfRichs} />

        <Box sx={{ marginTop: 3 }}>
          <Media media={media} removeMedia={!creatingLoading ? removeMedia : undefined} />
        </Box>

        <GolUploader
          uploadeError={uploadError}
          uploadedLinkAdded={setLinks}
          previewLinksAdded={(previews) => {
            setTimeout(() => {
              if (post.editMode) {
                setMedia([...mediaRef.current, ...previews]);
              } else {
                setMedia([...mediaRef.current, ...previews]);
              }
              mediaRef.current = [...mediaRef.current, ...previews];
            }, 10);
          }}
          linkRemoved={(link) => {
            setMedia([...media.filter((i) => i.uniqueId !== link.uniqueId)]);
            mediaRef.current = [...media.filter((i) => i.uniqueId !== link.uniqueId)];
          }}
          accept={['image/*', 'video/*']}
          removingUniqueId={removingUniqueId}
          uploadStart={startUpload}
          variant="withOutUi"
          showInput={showUpload}
        />
      </Stack>
      <CreatePostMainFootter
        addImage={() => {
          setShowUpload(true);
          setTimeout(() => {
            setShowUpload(false);
          }, 10);
        }}
      />

      <ConfirmDialog
        confirmText="Are you sure for remove this location?"
        actionButtonText="Approve"
        open={showRemoveMap}
        onClose={() => setShowRemoveMap(false)}
        titleText="Remove Location"
        confirm={() => dispatch(setLocation(null))}
      />

      <WarnDialog
        actionButtonText="OK"
        warnText={
          fileLimitationError === 'videoSize'
            ? 'The video file that you have selected is larger than 2 GB. Unable to send file.'
            : fileLimitationError === 'imageSize'
            ? 'The Image file that you have selected is larger than 30 MB. Unable to send file.'
            : fileLimitationError === 'imageCount' || fileLimitationError === 'videoCount'
            ? 'Please reduce the number of media files you are attaching. You can add maximum 10 images and 5 videos'
            : ''
        }
        open={fileLimitationError !== ''}
        onClose={() => setFileLimitationError}
        confirm={() => setFileLimitationError('')}
      />
    </>
  );
};

export default CreatePostHome;
