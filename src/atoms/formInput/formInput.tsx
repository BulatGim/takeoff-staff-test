import "./formInput.scss"
import {FC, useEffect, useState, ChangeEvent, KeyboardEvent} from "react";
import {IContact, IFormValues, IUser} from "../../types/contextTypes";
import {useHandleChange} from "../../hooks/useHandleChange";

interface IFromInputProps {
    errors: IError[];
    name: string;
    value: string | number;
    placeholder: string;
    width: number;
    height?: number;
    inputType?: string;
    required?: boolean;
    setter: (value: IFormValues | IUser | IContact)=>void;
    values: IFormValues | IUser | IContact;
    /*setter: (e:ChangeEvent<HTMLTextAreaElement>|ChangeEvent<HTMLInputElement>, setter: (value: IFormValues | IUser)=>void, values: IFormValues | IUser)=> void;*/
    validation?: (e:KeyboardEvent<HTMLTextAreaElement>|ChangeEvent<HTMLInputElement>)=>void;
    maxLength?: number;

}

export interface IError {
    formInput: string;
    error: string
}

const FormInput:FC<IFromInputProps> = (props) => {

    const [messageError, setMessageError] = useState("")

    const {handleChange} = useHandleChange(props.setter, props.values)

    useEffect(()=>{
        showError();
    }, [props])

    function showError() {
        if(!messageError){
            if (!props.errors){
                return
            }
            props.errors.map((item)=>{
                if (item.formInput === props.name){
                    return setMessageError(item.error);
                }
            })
        }else{
            let noError = true;
            props.errors.map((item)=>{
                if (item.formInput === props.name){
                    return noError = false;
                }else{
                    return
                }
            })
            if (noError){
                return setMessageError("");
            }
        }

    }
    return (
        <div className="formInput">
            <span
                className={props.value ? ("formInput__placeholder") : ("formInput__placeholder formInput__placeholder_big")}>{props.placeholder}</span>
            {props.inputType ? (
                <input className={messageError? ("formInput__input_error formInput__input"):("formInput__input")} type={props.inputType}
                       style={{width: props.width + "rem", height: props.height + "rem"}}
                       name={props.name}
                       value={props.value}
                       onChange={(e) => {handleChange(e); if (props.validation){props.validation(e)}}}
                       /*onKeyDown={(e)=>props.validation?props.validation(e):""}*/
                       required={props.required ? (true) : (false)}/>
            ) : (
                <textarea className={messageError? ("formInput__input_error formInput__input"):("formInput__input")}
                          style={{width: props.width + "rem", height: props.height + "rem"}}
                          value={props.value}
                          onChange={(e) => {handleChange(e); }}
                          onKeyDown={(e)=>props.validation?props.validation(e):""}
                          name={props.name} maxLength={props.maxLength}
                          required={props.required ? (true) : (false)}></textarea>
            )}
            <p className="formInput__error">{messageError}</p>
        </div>
    )
}
export default FormInput;