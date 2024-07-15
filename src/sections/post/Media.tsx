import { Box, Grid, Stack, styled, Typography } from '@mui/material';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import ConfirmDialog from 'src/components/dialogs/ConfirmDialog';
import { IMediaProps } from 'src/components/upload/GolUploader';

export type IMedias = {
  media: IMediaProps[];
  removeMedia?: (uniqueId: string) => void;
};

const Media: FC<IMedias> = (props) => {
  const { media, removeMedia } = props;
  const [showOthers, setShowOthers] = useState<boolean>(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [removingUiniqueId, setReemovingUiniqueId] = useState<string>('');

  const setGridFlex = (index: number) => {
    if (media.length > index + 1) {
      return 6;
    } else {
      if ((index + 1) % 2 !== 0) {
        return 12;
      } else {
        return 6;
      }
    }
  };

  const RemoveImageStyle = styled(Stack)(({ theme }) => ({
    width: 24,
    height: 24,
    backgroundColor: 'rgba(244, 247, 251, 0.64)',
    borderRadius: theme.shape.borderRadius,
    position: 'absolute',
    right: 8,
    top: 8,
    zIndex: 3,
    cursor: 'pointer',
  }));

  const ExtraMediaStyle = styled(Stack)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(244, 247, 251, 0.64)',
    zIndex: 2,
    cursor: 'pointer',
  }));

  useEffect(() => {
    if (media.length <= 4) {
      setShowOthers(false);
    }
  }, [media]);

  return (
    <Grid container spacing={1}>
      {media.slice(0, showOthers ? media.length : 4).map((m, index) => {
        if (m.link.indexOf('http://') == 0 || m.link.indexOf('https://') == 0) {
          return (
            <Grid key={m.uniqueId} item xs={setGridFlex(index)}>
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  height: index === 0 && index === media.length - 1 ? '300px' : 214,
                  position: 'relative',
                  backgroundImage: `url(${m.previewLink || m.link})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                {index === 3 && media.length > 4 && !showOthers ? (
                  <ExtraMediaStyle onClick={() => setShowOthers(true)} alignItems="center" justifyContent="center">
                    <Typography variant="h3" sx={{ fontSize: '32px!important', lineHeight: '40px', color: 'grey.500' }}>
                      +{media.length - 4}
                    </Typography>
                  </ExtraMediaStyle>
                ) : (
                  <>
                    {removeMedia && (
                      <RemoveImageStyle
                        onClick={() => {
                          setReemovingUiniqueId(m.uniqueId);
                          removeMedia(m.uniqueId);
                          // setShowConfirmDialog(true);
                        }}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <img src="/icons/close.svg" width={16} height={16} alt="remove-image" />
                      </RemoveImageStyle>
                    )}

                    {m.type === 'video' && <img src="/icons/play_icon.svg" width={40} height={40} alt="play-icon" />}
                  </>
                )}
              </Stack>
            </Grid>
          );
        } else {
          return (
            <Grid key={m.uniqueId} item xs={setGridFlex(index)}>
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  height: index === 0 && index === media.length - 1 ? '300px' : 214,
                  position: 'relative',
                  backgroundImage: `url(${m.previewLink || 'http://' + m.link})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                {index === 3 && media.length > 4 && !showOthers ? (
                  <ExtraMediaStyle onClick={() => setShowOthers(true)} alignItems="center" justifyContent="center">
                    <Typography variant="h3" sx={{ fontSize: '32px!important', lineHeight: '40px', color: 'grey.500' }}>
                      +{media.length - 4}
                    </Typography>
                  </ExtraMediaStyle>
                ) : (
                  <>
                    {removeMedia && (
                      <RemoveImageStyle
                        onClick={() => {
                          setReemovingUiniqueId(m.uniqueId);
                          removeMedia(m.uniqueId);
                          // setShowConfirmDialog(true);
                        }}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <img src="/icons/close.svg" width={16} height={16} alt="remove-image" />
                      </RemoveImageStyle>
                    )}

                    {m.type === 'video' && <img src="/icons/play_icon.svg" width={40} height={40} alt="play-icon" />}
                  </>
                )}
              </Stack>
            </Grid>
          );
        }
      })}

      {/* <ConfirmDialog
        confirmText="Are you sure for remove this media?"
        actionButtonText="Confirm"
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        titleText="Remove Media"
        confirm={() => {
          removeMedia ? removeMedia(removingUiniqueId) : null;
          setShowConfirmDialog(false);
        }}
      /> */}
    </Grid>
  );
};

export default Media;
