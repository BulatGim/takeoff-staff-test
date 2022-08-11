import {ChangeEvent, useState} from "react";
import {IFormValues, IUser} from "../types/contextTypes";

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
