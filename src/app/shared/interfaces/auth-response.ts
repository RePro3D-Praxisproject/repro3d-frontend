import { User } from "./user";

/**
 * Interface representing the response from an authentication service.
 */
export interface AuthResponse {
  /**
   * Indicates whether the authentication request was successful.
   */
  success: string;

  /**
   * Message providing additional information about the authentication response.
   */
  message: string;

  /**
   * The authenticated user's data.
   */
  data: User;
}
