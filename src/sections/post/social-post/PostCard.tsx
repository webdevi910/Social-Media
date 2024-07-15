import { Avatar, Box, Grid, Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from 'react';
import { basicCreateSocialPostSelector, initialState, valuingAll } from 'src/redux/slices/post/createSocialPost';
import { GetHomePageSocialPostsQuery } from 'src/_requests/graphql/post/getHomePageSocialPost.generated';
import PostActions from './PostActions';
import PostCounter from './PostCounter';
import PostDescription from './PostDescription';
import PostTitle from './PostTitle';
import { useDispatch, useSelector } from 'src/redux/store';
import { useRouter } from 'next/router';
import { PATH_APP } from 'src/routes/paths';
import ReactDOMServer from 'react-dom/server';
import { PRIMARY } from 'src/theme/palette';
import { jsx } from 'slate-hyperscript';
import SimpleVideo from 'src/components/video/SimpleVideo';

interface IImageStyleProps {
  limitHeight: boolean;
}

const RootStyle = styled(Stack)(({ theme }) => ({
  paddingTop: 1,
  backgroundColor: '#ffffff',
  borderRadius: theme.shape.borderRadius,
}));

const ImgStyle = styled('img')<IImageStyleProps>(({ theme, limitHeight }) => ({
  height: limitHeight ? 240 : 'auto',
  width: '100%',
}));
interface IPostCardInterface {
  post: any;
}

type PostMediaType = 'video' | 'img';

interface IPostMedia {
  link: string;
  type: PostMediaType;
  thumbnail?: string;
}

function PostCard(props: IPostCardInterface) {
  const dispatch = useDispatch();
  const [postCounter, setPostCounter] = useState([
    {
      id: 1,
      name: 'Remy Sharp',
      image: 'http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fuser.02b413c5.jpg&w=1920&q=75',
    },
    {
      id: 2,
      name: 'Travis Howard',
      image: 'https://mui.com/static/images/avatar/1.jpg',
    },
    {
      id: 3,
      name: 'Cindy Baker',
      image: 'https://mui.com/static/images/avatar/2.jpg',
    },
    {
      id: 4,
      name: 'Agnes Walker',
      image: 'https://mui.com/static/images/avatar/3.jpg',
    },
  ]);
  const { post } = props;
  const { push } = useRouter();
  const [body, setBody] = useState<string>('');
  const [media, setMedia] = useState<IPostMedia[]>([]);

  const editBody = [];

  const handleTextBodyEdit = () => {
    let editText = post.body;
    let mentionIndex = -1;
    let tagIndex = -1;
    let element: any = [];
    let children = [];
    let bodyText = '';
    let editTextIndex = 0;

    if (editText.length === 0) {
      children = initialState.text;
    }

    while (editText.length > 0) {
      if (editText[editTextIndex] !== '╣' && editText[editTextIndex] !== '#' && editText[editTextIndex] !== '\\') {
        bodyText += editText[editTextIndex];
        editTextIndex++;
        if (editText[editTextIndex] === null || editText[editTextIndex] === undefined) {
          editText = '';
          editTextIndex = 0;
          element.push({ text: bodyText });
          bodyText = '';
          children.push({ type: 'paragraph', children: element });
          break;
        }
      } else {
        editText = editText.substr(editTextIndex);
        editTextIndex = 0;
        element.push({ text: bodyText });
        bodyText = '';
        if (editText[editTextIndex] === '╣') {
          const mention = editText.match(/╣(.*?)╠/)[0];
          mentionIndex++;
          const mentionedValue = mention.replace('╣', '').replace('╠', '');
          element.push(
            jsx(
              'element',
              {
                type: 'mention',
                username: mentionedValue,
                fullname: mentionedValue,
                class: 'inserted-mention',
              },
              [{ text: '' }]
            )
          );
          element.push({ text: '' });
          editText = editText.replace(/╣(.*?)╠/, '');
        } else if (editText[editTextIndex] === '#') {
          const tag = editText.match(/#(.*?)\s/)[0];
          tagIndex++;
          const tagedValue = tag.replace('#', '');
          element.push(jsx('element', { type: 'tag', class: 'inserted-tag', title: tagedValue }, [{ text: '' }]));
          element.push({ text: '' });
          editText = editText.replace(/#(.*?)\s/, '');
        } else if (editText[editTextIndex] === '\\') {
          editText = editText.substr(2);
          children.push({ type: 'paragraph', children: element });
          element = [];
        }
      }

      if (editText === '') {
        children.push({ type: 'paragraph', children: element });
      }
    }

    return children;
  };
  const setEditingValue = () => {
    push(PATH_APP.post.createPost.socialPost.index);
    dispatch(
      valuingAll({
        audience: post.audience,
        gifs: '',
        location: {
          address: post.placeDescription,
          id: post.placeId,
          name: post.placeMainText,
          variant: 'company',
          secondaryText: post.placeSecondaryText,
        },
        picturesUrls: post.pictureUrls.map((picture: string) => ({ altImage: '', isDefault: false, url: picture })),
        text: handleTextBodyEdit(),
        videoUrls: post.videoUrls.map((video: string) => ({ url: video, isDefault: false })),
        editMode: true,
        id: post.id,
        currentPosition: [],
      })
    );
  };

  const MentionElementCreator = (fullname: string, username: string, id: string) => (
    <Link href="">
      <Typography
        variant="subtitle1"
        color={PRIMARY.main}
        className="inserted-mention"
        id={id}
        sx={{
          padding: '0!important',
          verticalAlign: 'baseline',
          display: 'inline-block',
          lineHeight: '0',
        }}
      >
        {fullname}
      </Typography>
    </Link>
  );

  const TagElementCreator = (tag: string) => (
    <Link href="">
      <Typography
        variant="subtitle1"
        color={PRIMARY.main}
        className="inserted-tag"
        sx={{
          verticalAlign: 'baseline',
          display: 'inline-block',
          padding: '0!important',
          lineHeight: '0',
        }}
      >
        {tag}
      </Typography>
    </Link>
  );

  const BrElementCreator = () => <br />;

  const setGridFlex = (type: PostMediaType, index: number) => {
    const beforeFullWidth = media[index - 1] && media[index - 1].type === 'video' ? true : false;
    const nextFullWidth = media[index + 1] && media[index + 1].type === 'video' ? true : false;

    if (type === 'img') {
      if (beforeFullWidth || nextFullWidth) {
        if ((index + 1) % 2 !== 0) {
          return 12;
        } else {
          return 6;
        }
      } else {
        if (media.length > index + 1) {
          return 6;
        } else {
          if ((index + 1) % 2 !== 0) {
            return 12;
          } else {
            return 6;
          }
        }
      }
    } else if (type === 'video') {
      return 12;
    }
  };

  const valuingMedia = () => {
    const newMedia: IPostMedia[] = [];
    post.pictureUrls.forEach((picture) => {
      newMedia.push({ link: picture, type: 'img' });
    });

    post.videoUrls.forEach((video) => {
      newMedia.push({ link: video, type: 'video', thumbnail: '' });
    });

    setMedia([...newMedia]);
  };

  useEffect(() => {
    if (!post) return;
    let body = post.body;
    const mentions = body.match(/╣(.*?)╠/g) || [];
    const tags = body.match(/#(.*?)\s/g) || [];
    const newLines = body.match(/[\\\/]/g) || [];

    body = body.replace(/\\n/g, ReactDOMServer.renderToStaticMarkup(BrElementCreator()));

    mentions.forEach((mention) => {
      const mentionedValue = mention.replace('╣', '').replace('╠', '');
      body = body.replace(
        mention,
        ReactDOMServer.renderToStaticMarkup(MentionElementCreator(mentionedValue, mentionedValue, mentionedValue))
      );
    });

    tags.forEach((tag) => {
      body = body.replace(new RegExp(tag, 'g'), ReactDOMServer.renderToStaticMarkup(TagElementCreator(tag)));
    });

    setBody(body);
    valuingMedia();
  }, [post]);

  return (
    <RootStyle sx={{ paddingTop: 2, backgroundColor: '#ffffff' }}>
      <PostTitle
        editCallback={() => {
          setEditingValue();
        }}
        avatar={
          <Avatar
            sx={{ height: 48, width: 48 }}
            aria-label="recipe"
            src={post?.userAvatarUrl || '../src/assets/image/user.jpg'}
            alt="Hanna Baldin"
          />
        }
        username={post?.firstName && post.lastName ? `${post?.firstName} ${post.lastName}` : ''}
        Date={post?.createdDateTime || ''}
        PostNo={'simple'}
      />
      <Box sx={{ paddingTop: 2 }} />
      <PostDescription description={body || ''} />
      <Box sx={{ paddingTop: 2 }} />
      <Grid container spacing={0.5}>
        {media.map((value, index) => (
          <Grid key={value.link} item xs={setGridFlex(value.type, index)}>
            {value.type === 'img' && (
              <ImgStyle
                limitHeight={setGridFlex(value.type, index) === 6 ? true : false}
                key={value.link}
                src={
                  value.link.indexOf('http') >= 0 || value.link.indexOf('https') >= 0
                    ? value.link
                    : `http://${value.link}`
                }
              />
            )}

            {value.type === 'video' && <SimpleVideo key={value.link} autoShow src={value.link} />}
          </Grid>
        ))}
      </Grid>
      <Box sx={{ paddingTop: 2 }} />

      <PostCounter
        type={true} //Like & comments Counter
        counter={109}
        lastpersonName={'Davood Malekia'}
        lastpersonsData={postCounter}
        Comments={post?.countOfComments || '0'}
      />
      <Box sx={{ paddingTop: 1 }} />

      <PostActions
        like={post?.countOfLikes || '0'}
        comment={post?.countOfComments || '0'}
        share={post?.countOfShared || '0'}
        view={post?.countOfViews || '0'}
      />
      {/* <PostCommets comments={comments} /> */}
    </RootStyle>
  );
}

export default PostCard;
