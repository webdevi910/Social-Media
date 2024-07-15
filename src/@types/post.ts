import { Descendant } from 'slate';
import { ILocationSelect } from 'src/components/location/LocationSelect';
import { Audience, PictureUrlInputType, VideoUrlInputType } from './sections/serverTypes';

export interface ICreateSocialPost {
  audience: Audience;
  text: Descendant[] ;
  gifs: string;
  location: ILocationSelect | null;
  picturesUrls: PictureUrlInputType[];
  videoUrls: VideoUrlInputType[];
  editMode:boolean;
  id?:string;
  currentPosition: number[];
}
