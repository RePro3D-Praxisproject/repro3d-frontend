/**
 * Interface representing the response structure for the webshop configuration.
 */
export interface ConfigResponse {
    /** Indicates whether the request was successful. */
    success: boolean;
  
    /** Message providing additional information about the response. */
    message: string;
  
    /** Configuration data including id, key, and value. */
    data: {
      id: number;
      key: string;
      value: string;
    };
  }