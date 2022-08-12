import {ChangeEvent} from "react";
import {IFormValues, IUser} from "../types/types";

export const useHandleChange = (setter: (value: IFormValues | IUser)=>void, values: IFormValues | IUser)=>{
    function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setter({
            ...values,
            [name]: value
        })
    }
    return {handleChange}
}
