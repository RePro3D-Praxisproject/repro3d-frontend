export interface Item {
    item_id: number,
    name: string,
    cost: number,
    est_time: number,
    material: string,
    dimensions: string,
    description: string,
    imgUrl: string
}

export interface ItemResponse {
    success: boolean,
    message: string,
    data: Item[]
}