import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface IUserAuthInfoReq extends Request{
    user?:string
}