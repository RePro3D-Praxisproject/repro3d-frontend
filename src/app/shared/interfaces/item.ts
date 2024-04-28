export interface Item {
    item_id: number,
    name: string,
    description: string,
    est_time: number,
    dimensions: string,
    file_ref: string,
    material: string,
    cost: number,
}

export interface ItemResponse {
    success: boolean,
    message: string,
    data: Item[]
}