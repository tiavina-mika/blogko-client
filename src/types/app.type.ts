import { IUser } from "./user.type";

export interface ILayoutError {
  setLayoutError: (error: string) => void;
  layoutError: string;
}

export interface IDashboardGlobalState extends ILayoutError, IUser {}