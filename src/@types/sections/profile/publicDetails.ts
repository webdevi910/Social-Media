import { Location, Relationship } from '../serverTypes';

export interface ProfilePublicDetailsState {
  relationShip?: Relationship;
}

export interface UserLocationState {
  city: LocationType;
}

export interface LocationType extends Omit<Location, 'id' | 'personId' | 'cityId'> {
  id?: string;
  personId?: string;
  cityId?: string;
}