import { Request } from "express"
//import User from '../../database/models/user';

export interface RequestUser extends Request {
  user: any;
}