import {IUser} from "../types/types";
import {makeAutoObservable} from "mobx";

export default class userStore {
    _user: IUser | null

    constructor(){
        this._user=null;
        makeAutoObservable(this);
    }

    setUser(user:IUser){
        this._user = user
    }

    get User():IUser | null{
        return this._user
    }
}