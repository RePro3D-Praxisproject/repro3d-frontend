export interface Item {
    item_id: number,
    title: string,
    price: number,
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