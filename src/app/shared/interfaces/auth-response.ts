import { User } from "./user";

export interface AuthResponse {
    success: string;
    message: string;
    data: User
  }