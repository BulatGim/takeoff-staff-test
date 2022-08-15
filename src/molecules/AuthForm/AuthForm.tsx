import {useCallback, useContext, useState} from 'react';
import FormInput from "../../atoms/formInput/formInput";
import {useNavigate} from "react-router-dom";
import {IFormValues, IUserError} from "../../types/types";
import MyButton from "../../atoms/myButton/myButton";
import "./AuthForm.scss"
import {useUserError} from "../../hooks/useUserErrors"
import {Context} from "../../index";
import {useUserSendHook} from "../../hooks/useUserSendHook";

const AuthForm = () => {

    let context = useContext(Context)

    const [values, setValues] = useState<IFormValues>({name:"", password:""});
    const [userError, setUserError] = useState<IUserError[] | []>([])

    const {showUserError, hideUserError} = useUserError(userError, setUserError)

    const [, updateState] = useState<undefined | object>();
    const forceUpdate = useCallback(() => updateState({}), []);

    let login = useUserSendHook()

    let navigate = useNavigate()

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
            let data = await login(url, values)
            context?.user.setUser(data)
            navigate("contacts")
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