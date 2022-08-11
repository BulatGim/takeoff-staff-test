import {FC, useContext} from 'react';
import {Context} from "../../index";
import AuthForm from "../../molecules/AuthForm/AuthForm";

const Auth: FC = () => {
    let context = useContext(Context)
    return (
        <div>
            <AuthForm/>
        </div>
    );
};

export default Auth;