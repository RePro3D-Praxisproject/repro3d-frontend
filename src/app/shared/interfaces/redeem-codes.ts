/**
 * Interface representing a redeem code.
 */
export interface RedeemCode {
  /** Unique identifier for the redeem code. */
  rc_id: number;

  /** The redeem code string. */
  rcCode: string;

  /** Indicates whether the redeem code has been used. */
  used: boolean;
}

/**
 * Interface representing the response from an API that fetches redeem codes.
 */
export interface RedeemCodeResponse {
  /** Indicates whether the request was successful. */
  success: string;

  /** Message providing additional information about the response. */
  message: string;

  /** Array of redeem codes returned by the API. */
  data: RedeemCode[];
}
