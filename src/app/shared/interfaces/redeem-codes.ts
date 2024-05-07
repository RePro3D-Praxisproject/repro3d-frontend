
export class RedeemCodes {
  rc_id?:number;
  rcCode?:string;
  used?:number;


}

export interface RedeemCodeResponse {
  success: string;
  message: string;
  data: RedeemCodes[]

}
