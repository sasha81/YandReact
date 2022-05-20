import { Action, AnyAction, Middleware } from 'redux';
import {IUserResponseBody, IForm,IUser} from 'components/Interfaces';

export interface IAction<T> extends Action{
      payload: T;
}
export interface IBareAction{
    type:string;
}

export type Actions = IAction<IUser> | IAction<null> | Action;