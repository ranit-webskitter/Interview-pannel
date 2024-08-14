import { IUserProfileDetails } from "@/typescript/interface/common.interface";
import { userData } from "@/typescript/types/common.type";

export interface userSliceData {
  isLoggedIn: boolean;
  userData: IUserProfileDetails | null;
}

export interface registrationData {}

export interface globalStateInterface {
  counter: number;
}
