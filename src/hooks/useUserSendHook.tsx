import {IUser} from "../types/types";
import axios from "axios";

export const useUserSendHook = ()=>{
    let login = async(url:string, value:IUser)=>{
        try {
            let {data} = await axios.post(url, value)
            if (data){
                return data;
            }
        }catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.message);
            } else {
                alert('An unexpected error occurred');
            }
        }
    }
    return login;
}