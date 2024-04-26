import { Role } from "./role";

export interface User {
    userId: number | null;
    email: string;
    billingAddress: string;
    role: Role | null;
    passwordHash: string;
}