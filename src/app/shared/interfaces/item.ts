/**
 * Interface representing an item.
 */
export interface Item {
    /** Unique identifier for the item. */
    item_id: number;
    
    /** Name of the item. */
    name: string;
    
    /** Description of the item. */
    description: string;
    
    /** Estimated time to produce the item. */
    est_time: number;
    
    /** Dimensions of the item (e.g., "L x W x H"). */
    dimensions: string;
    
    /** Reference to the file associated with the item. */
    file_ref: string;
    
    /** Material used to produce the item. */
    material: string;
    
    /** URL of the item's image. */
    image_url: string;
    
    /** Cost of the item. */
    cost: number;
  }
  
  /**
   * Interface representing the response from an API that fetches items.
   */
  export interface ItemResponse {
    /** Indicates whether the request was successful. */
    success: boolean;
    
    /** Message providing additional information about the response. */
    message: string;
    
    /** Array of items returned by the API. */
    data: Item[];
  }
  