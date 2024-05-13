
export interface RedeemCode {
  rc_id: number,
  rcCode: string,
  used: boolean
}

export interface RedeemCodeResponse {
  success: string;
  message: string;
  data: RedeemCode[]
}
