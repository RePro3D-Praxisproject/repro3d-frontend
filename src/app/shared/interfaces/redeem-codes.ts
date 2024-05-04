
export class RedeemCodes {
  rc_id?:number;
  rc_code?:string;
  used?:number;


}

export interface RedeemCodeResponse {
  success: string;
  message: string;
  data: RedeemCodes[]

}
