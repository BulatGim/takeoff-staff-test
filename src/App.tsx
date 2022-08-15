import './App.scss';
import React, {useContext, useEffect} from 'react';
import AppRouter from "./router/AppRouter";
import {useUserSendHook} from "./hooks/useUserSendHook";
import {useNavigate} from "react-router-dom";
import {Context} from "./index";

function App() {

    let context = useContext(Context)

    const login = useUserSendHook()
    let navigate = useNavigate()

    async function recallUser() {
        let url:string = (process.env.REACT_APP_JSON_SERVER_LOGIN_URL as string)
        let data = await login(url, JSON.parse(localStorage.getItem("user") as string))
        context?.user.setUser(data)
        navigate("contacts")
    }

    useEffect(()=>{
        if (localStorage.getItem("user")){
            recallUser()
        }
    }, [])

  return (
      <div className="App">
          <AppRouter />
      </div>
  );
}

export default App;
