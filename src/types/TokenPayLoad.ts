import { USER_ROLE } from "./User_ROLE";

export interface TokenPayload {
  id: string;
  name: string;
  role: USER_ROLE;
}
