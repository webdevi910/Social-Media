import { Box, styled, SxProps, Theme } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { EntityType, FileInput } from 'src/@types/sections/serverTypes';
import { getFileInputInformations } from 'src/utils/fileFunctions';
import BlockContent from './BlockContent';
import { v4 as uuidv4 } from 'uuid';
import Resumable from 'resumablejs';
import { useUploadImageMutation } from 'src/_requests/graphql/upload/mutations/createFile.generated';
import { useDispatch, useSelector } from 'src/redux/store';
import { getUploadingFiles, setUploadingFiles } from 'src/redux/slices/upload';
import { FILELIMITATION } from 'src/config';

type GolUploaderVariant = 'witUi' | 'withOutUi';

interface IGolUploaderInterface {
  audioEntityType?: EntityType;
  videoEntityType?: EntityType;
  imageEntityType?: EntityType;
  documentEntityType?: EntityType;
  uploadedLinkAdded: (linkProp: IMediaProps[]) => void;
  previewLinksAdded: (linkProps: IMediaProps[]) => void;
  linkRemoved: (linkProp: IMediaProps) => void;
  sx?: SxProps<Theme>;
  accept?: string | string[];
  removingUniqueId?: string | null;
  uploadStart: boolean;
  variant: GolUploaderVariant;
  showInput?: boolean;
  uploadeError?: (error: LimitationType) => void;
}

type fileType = 'image' | 'video';

interface IVideoValue {
  file: File;
  thumbnail: string;
}

export interface IUploadingFiles {
  type: fileType;
  value: FileInput | IVideoValue;
  uniqueId: string;
}

export type mediaType = 'image' | 'video' | 'gif';

export interface IMediaProps {
  link: string;
  uniqueId: string;
  type: mediaType;
  previewLink: string;
}

type StatusType =
  | 'complete'
  | 'fileSuccess'
  | 'fileError'
  | 'fileProgress'
  | 'cancel'
  | 'uploadStart'
  | 'pause'
  | 'fileError'
  | 'notStarted';

export interface IChunkUploadFile {
  status: StatusType;
  progress: number;
  uniqueId: string;
}

export type LimitationType = 'videoSize' | 'imageSize' | 'imageCount' | 'videoCount' | '';

interface IDropzoneStyleProps {
  variant: GolUploaderVariant;
}

const DropZoneStyle = styled('div')<IDropzoneStyleProps>(({ theme, variant }) => ({
  outline: 'none',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: variant === 'witUi' ? theme.palette.background.neutral : '',
  border: variant === 'witUi' ? `1px dashed ${theme.palette.grey[500_32]}` : '',
  '&:hover': { opacity: 0.72, cursor: 'pointer' },
  display: variant === 'witUi' ? '' : 'none',
}));

const GolUploader: FC<IGolUploaderInterface> = (props) => {
  const uploadingFiles = useSelector(getUploadingFiles);
  const uploadingFilesRef = useRef(uploadingFiles);
  const dispatch = useDispatch();
  const [firstTime, setFirstTime] = useState<boolean>(true);

  useEffect(() => {
    if (firstTime) {
      addToLinks(uploadingFiles);
      setFirstTime(false);
    }
  }, [uploadingFiles]);

  // const uploadServiceUrl = process.env.NEXT_CHUNK_CHUNK_UPLOAD as string;
  const uploadServiceUrl = 'https://devupload.gardenoflove.ir/';

  const config: Resumable.ConfigurationHash = {
    generateUniqueIdentifier() {
      return uuidv4();
    },
    testChunks: false,
    chunkSize: 1 * 1024 * 1024,
    simultaneousUploads: 1,
    fileParameterName: 'file',
    forceChunkSize: true,
    uploadMethod: 'PUT',
    chunkNumberParameterName: 'chunkNumber',
    chunkSizeParameterName: 'chunkSize',
    currentChunkSizeParameterName: 'chunkSize',
    fileNameParameterName: 'fileName',
    totalSizeParameterName: 'totalSize',
  };

  const [uploadImage] = useUploadImageMutation();

  const [resumable, setResumable] = useState<Resumable>(new Resumable(config));
  const [chunkFileUploading, setChunkFileUploading] = useState<IChunkUploadFile>({
    progress: 0,
    status: 'notStarted',
    uniqueId: '',
  });
  const [uploadingVideoIndex, setUploadingVideoIndex] = useState<number | null>(null);
  const uploadingVideoIndexRef = useRef(uploadingVideoIndex);

  const upload = (file: File) => {
    // const creationSessionId = uuidv4();

    resumable.addFile(file);
    const creationSessionId = Number.parseInt(`${Math.random() * 1000}`);
    fetch(`${uploadServiceUrl}api/fileupload/create/${creationSessionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chunkSize: resumable!.opts.chunkSize,
        totalSize: file.size,
        fileName: file.name,
      }),
    })
      .then((response) => response.json())
      .then((data: any) => {
        resumable.opts.target = `${uploadServiceUrl}api/fileupload/upload/user/${creationSessionId}/session/${data.sessionId}`;
        resumable.upload();
      });
  };

  const {
    imageEntityType,
    previewLinksAdded,
    sx,
    accept,
    removingUniqueId,
    uploadedLinkAdded,
    uploadStart,
    variant,
    showInput,
    linkRemoved,
    uploadeError,
  } = props;

  const { getRootProps, getInputProps, isDragActive, acceptedFiles, open } = useDropzone({
    accept,
  });

  useEffect(() => {
    if (showInput) {
      open();
    }
  }, [showInput]);

  const [links, setLinks] = useState<IMediaProps[]>([]);
  const errorSetted = useRef<boolean>(false);
  const linksRef = useRef(links);

  const videoRef = useRef<any>(null);

  useEffect(() => {
    valuingUploadingFileWhenAcceptedFilesChange();
  }, [acceptedFiles]);

  const valuingUploadingFiles = (files: IUploadingFiles[]) => {
    dispatch(setUploadingFiles(files));
    uploadingFilesRef.current = files;
  };

  const valuingLinks = (links: IMediaProps[]) => {
    setLinks([...links]);
    linksRef.current = links;
  };

  useEffect(() => {
    if (removingUniqueId) {
      const removingIndex = uploadingFiles.findIndex((i) => i.uniqueId === removingUniqueId);
      if (removingIndex >= 0) {
        const lastUploadingFiles = [...uploadingFiles];
        const lastLinks = [...links];
        const removedLink = lastLinks[removingIndex];
        lastUploadingFiles.splice(removingIndex, 1);
        lastLinks.splice(removingIndex, 1);
        valuingUploadingFiles(lastUploadingFiles);
        valuingLinks(lastLinks);
        linkRemoved(removedLink);
      }
    }
  }, [removingUniqueId]);

  useEffect(() => {
    setResumable(new Resumable(config));
  }, []);

  const getNextVideo = () => {
    const lastFiles = [...uploadingFilesRef.current];
    lastFiles.splice(0, uploadingVideoIndexRef.current !== null ? uploadingVideoIndexRef.current + 1 : 0);
    const nextVideoIndex = uploadingFilesRef.current.findIndex(
      (i) => i.uniqueId === lastFiles.find((i) => i.type === 'video')?.uniqueId
    );
    if (nextVideoIndex >= 0) {
      setUploadingVideoIndex(nextVideoIndex);
      uploadingVideoIndexRef.current = nextVideoIndex;
    } else {
      console.log(linksRef.current);
      uploadedLinkAdded(linksRef.current);
    }
  };

  useEffect(() => {
    if (resumable) {
      resumable.on('fileSuccess', (file: Resumable.ResumableFile, message: string) => {
        setChunkFileUploading((prev) => ({ ...prev, status: 'fileSuccess', progress: 0 }));
        const newUploadingFileIndex = uploadingVideoIndexRef.current;
        if (newUploadingFileIndex !== null && newUploadingFileIndex >= 0) {
          const newUploadingFileTumbnail = (uploadingFilesRef.current[newUploadingFileIndex].value as IVideoValue)
            .thumbnail;
          const uniqueId = uploadingFilesRef.current[newUploadingFileIndex].uniqueId;
          const newLinks = linksRef.current;
          newLinks[newUploadingFileIndex] = {
            link: message.replace(/["']/g, ''),
            previewLink: newUploadingFileTumbnail,
            type: 'video',
            uniqueId,
          };
          valuingLinks(newLinks);
        }
        getNextVideo();
      });

      resumable.on('fileError', (file, message) => {
        setChunkFileUploading((prev) => ({ ...prev, status: 'fileError', progress: 0 }));
        getNextVideo();
      });

      resumable.on('fileProgress', (file: any, message: string) => {
        setChunkFileUploading((prev) => ({ ...prev, status: 'fileProgress', progress: file.progress() * 100 }));
      });
    }
  }, [resumable]);

  const uploadImageFunction = (imageInformations: FileInput) =>
    new Promise((resolve, reject) => {
      uploadImage({ file: { dto: imageInformations } })
        .unwrap()
        .then((res) =>
          resolve(
            res &&
              res.createFile &&
              res.createFile?.listDto &&
              res.createFile?.listDto?.items &&
              res.createFile?.listDto?.items[0]
              ? res.createFile?.listDto?.items[0]?.url
              : ''
          )
        )
        .catch((err) => reject(err));
    });

  const uploadAllImages = async () => {
    const images = [...uploadingFiles.filter((i) => i.type === 'image')];
    const newLinks = [...links];
    const promises = images.map(async (image) => {
      try {
        const imageInformations = { ...image.value } as FileInput;
        const previewLink = imageInformations.binary || '';
        imageInformations.binary = imageInformations.binary!.split(',')[1];
        const link = await uploadImageFunction(imageInformations);
        const linkIndex = uploadingFiles.findIndex((i) => i.uniqueId === image.uniqueId);

        const fileLink: IMediaProps = {
          link: `${link}`,
          previewLink: previewLink,
          type: 'image',
          uniqueId: image.uniqueId,
        };

        newLinks[linkIndex] = fileLink;

        return link;
      } catch (error) {
        console.log(error);
      }
    });
    await Promise.all(promises);
    valuingLinks(newLinks);
    const firstVideoIndex = uploadingFiles.findIndex((i) => i.type === 'video');
    if (firstVideoIndex >= 0) {
      setUploadingVideoIndex(firstVideoIndex);
      uploadingVideoIndexRef.current = firstVideoIndex;
    } else {
      uploadedLinkAdded(newLinks);
    }
  };

  useEffect(() => {
    if (!uploadStart) return;
    uploadAllImages().then().catch();
  }, [uploadStart]);

  useEffect(() => {
    setTimeout(() => {
      if (uploadingVideoIndex !== null) {
        const videoValue = uploadingFiles[uploadingVideoIndex].value as IVideoValue;
        upload(videoValue.file);
      }
    }, 10);
  }, [uploadingVideoIndex]);

  const addToLinks = (newUploadingFiles: IUploadingFiles[]) => {
    const newLinks: IMediaProps[] = [];
    newUploadingFiles.forEach((file) => {
      if (file.type === 'image') {
        const value = file.value as FileInput;
        newLinks.push({ link: '', previewLink: value.binary!, uniqueId: file.uniqueId, type: 'image' });
      } else {
        const value = file.value as IVideoValue;
        newLinks.push({ link: '', uniqueId: file.uniqueId, type: 'video', previewLink: value.thumbnail! });
      }
      valuingLinks([...links, ...newLinks]);
      previewLinksAdded(newLinks);
    });
  };

  const generateThumbnailAsync = () =>
    new Promise<string>((resolve) => {
      const handleSeeked = () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef!.current!.videoWidth;
        canvas.height = videoRef!.current!.videoHeight;
        canvas!.getContext('2d')!.drawImage(videoRef.current!, 0, 0);
        // convert it to a usable data URL
        const dataURL = canvas.toDataURL();
        videoRef!.current!.removeEventListener('seeked', handleSeeked);
        resolve(dataURL);
      };
      videoRef!.current!.addEventListener('seeked', handleSeeked);
      videoRef!.current!.currentTime = 1;
    });

  const sendError = (error: LimitationType) => {
    if (!errorSetted.current) {
      errorSetted.current = true;
      uploadeError(error);
    }
  };

  const handleFiles = (file: File) => {
    if (new RegExp('image', 'g').test(file.type)) {
      if (file.size > FILELIMITATION.image) {
        sendError('imageSize');
        return false;
      }
      return true;
    } else if (new RegExp('video', 'g').test(file.type)) {
      if (file.size > FILELIMITATION.video) {
        sendError('videoSize');
        return false;
      }
      return true;
    } else {
      return false;
    }
  };

  const valuingUploadingFileWhenAcceptedFilesChange = async () => {
    try {
      errorSetted.current = false;
      if (acceptedFiles.length === 0) return;
      const unresolvedPromises = acceptedFiles.map(async (file) => {
        const fileStatus = handleFiles(file);
        if (new RegExp('image', 'g').test(file.type) && fileStatus) {
          const fileInput = await getFileInputInformations(file, imageEntityType!);
          const returned: IUploadingFiles = { type: 'image', value: fileInput!, uniqueId: uuidv4() };
          return returned;
        } else if (new RegExp('video', 'g').test(file.type) && fileStatus) {
          console.log(file.type);
          if (file.type !== 'video/x-ms-wmv' && file.type !== 'video/avi') {
            videoRef!.current!.src = URL.createObjectURL(file);
            // videoRef!.current!.currentTime = 0;
            const thumbnail = await generateThumbnailAsync();
            const returned: IUploadingFiles = { type: 'video', value: { file: file, thumbnail }, uniqueId: uuidv4() };
            return returned;
          } else {
            const returned: IUploadingFiles = {
              type: 'video',
              value: { file: file, thumbnail: '' },
              uniqueId: uuidv4(),
            };
            return returned;
          }
        }
      });

      let newAdded = await Promise.all(unresolvedPromises);
      newAdded = newAdded.filter((i) => i != undefined && i != null);
      const newUploadingFiles = [...uploadingFiles, ...newAdded];

      valuingUploadingFiles(newUploadingFiles);
      addToLinks(newAdded);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
        }}
      >
        <input {...getInputProps()} />

        {variant === 'witUi' && <BlockContent />}
      </DropZoneStyle>

      <video width="100%" height="300px" hidden ref={videoRef} id="thumbnail-video">
        <source />
      </video>
    </Box>
  );
};

export default GolUploader;
