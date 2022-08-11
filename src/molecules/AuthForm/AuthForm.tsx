import {useCallback, useContext, useState} from 'react';
import FormInput from "../../atoms/formInput/formInput";
import {useNavigate} from "react-router-dom";
import {IFormValues, IUserError} from "../../types/contextTypes";
import MyButton from "../../atoms/myButton/myButton";
import "./AuthForm.scss"
import {useHandleChange} from "../../hooks/useHandleChange";
import {useUserError} from "../../hooks/useUserErrors"
import axios from "axios";
import {Context} from "../../index";

const AuthForm = () => {
    const [values, setValues] = useState<IFormValues>({name:"", password:""});
    const [userError, setUserError] = useState<IUserError[] | []>([])

    const {showUserError, hideUserError} = useUserError(userError, setUserError)

    const [, updateState] = useState<undefined | object>();
    const forceUpdate = useCallback(() => updateState({}), []);

    let navigate = useNavigate()

    let context = useContext(Context)

    function nameValidation() {
        values.name ? hideUserError("name") : showUserError("name", "Имя не может быть пустым")
    }

    function passwordValidation(){
        values.password?hideUserError("password"):showUserError("password", "Пароль не может быть пустым")
    }

    async function send() {
        nameValidation();
        passwordValidation();
        setUserError(userError)
        forceUpdate()
        if (userError.length ===0){
            let url:string = (process.env.REACT_APP_JSON_SERVER_LOGIN_URL as string)
            try {
                let {data} = await axios.post(url, values)
                if (data){
                    context?.user.setUser(data)
                    navigate("contacts")

                }
            }catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log(error)
                    alert(error.message);
                } else {
                    alert('An unexpected error occurred');
                }
            }
        }
    }

    return (
        <div className="AuthForm">
            <FormInput errors={userError} name={"name"} value={values.name || ""} placeholder={"Введите имя"} width={20} setter={setValues} values={values}/>
            <FormInput errors={userError} name={"password"} value={values.password || ""} placeholder={"Введите пароль"} width={20} inputType={"password"} setter={setValues} values={values}/>
            <MyButton callBack={()=>send()}>
                <p>Отправить</p>
            </MyButton>
        </div>
    );
};

export default AuthForm;