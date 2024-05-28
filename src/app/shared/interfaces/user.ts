import { Role } from "./role";

/**
 * Interface representing a user.
 */
export interface User {
  /** Unique identifier for the user, or null if not assigned. */
  userId: number | null;

  /** Email address of the user. */
  email: string;

  /** Billing address of the user. */
  billingAddress: string;

  /** Role assigned to the user, or null if no role is assigned. */
  role: Role | null;
}
