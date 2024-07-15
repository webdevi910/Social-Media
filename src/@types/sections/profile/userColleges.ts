import { PersonCollege } from "../serverTypes";

export interface UserCollegeType extends Omit<PersonCollege,'id'>{
    id?:string
}

export interface profileCollegeState{
    // colleges?:UserCollegeType[],
    college?:UserCollegeType,
    university?:UserCollegeType,
}