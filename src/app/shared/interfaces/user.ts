import { Role } from "./role";

export interface User {
    userId: number;
    email: string;
    billingAddress: string;
    role: Role;
    passwordHash: string;
}