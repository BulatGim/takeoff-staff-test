import React, {useContext, useEffect, useState} from 'react';
import "./Contacts.scss"
import {Context} from "../../index";
import MyButton from "../../atoms/myButton/myButton";
import MyModal from "../../organisms/MyModal/MyModal";
import AddNewContact from "../../molecules/addNewContact/addNewContact";
import {observer} from "mobx-react-lite";
import Contact from "../../molecules/contact/contact";
import {useNavigate} from "react-router-dom";
import moment from "moment"

const Contacts = observer(() => {
    const context = useContext(Context)

    const [isModalActive, setIsModalActive] = useState<boolean>(false)

    const [hours, setHours] = useState<number>(Number(moment().format("hh")))

    const [minutes, setMinutes] = useState<number>(Number(moment().format("mm")))

    let navigate = useNavigate()

    useEffect(()=>{
        setInterval(()=>{
            setHours(Number(moment().format("hh")))
            setMinutes(Number(moment().format("mm")))
        }, 30000)
        return clearInterval
    }, [])

    function showHideModal() {
        isModalActive?(setIsModalActive(false)): setIsModalActive(true)
    }
    
    function quit() {
        localStorage.setItem("user", "")
        context?.user.zeroingUser()
        navigate("/")
    }

    useEffect(()=>{
        isModalActive?(document.body.style.overflow = "hidden"): (document.body.style.overflow = "visible")
    }, [isModalActive])
    return (
        <div className="Contacts">
            <section className="header">
                <div className="header-hello">
                    <h2 className="header-hello__item">Здравствуйте {context?.user?.User?.name}</h2>
                    <h3 className="header-hello__contacts-list">Ваш список контактов:</h3>
                </div>
                <div className="header-panel">
                    <MyButton callBack={quit}><h3>Выйти</h3></MyButton>
                    <h3 className="header-panel__hours-minutes">{hours} : {minutes}</h3>
                </div>
            </section>
            <section>
                <MyButton callBack={showHideModal}>
                    <h3>создать новый контакт</h3>
                </MyButton>
                {isModalActive?(
                    <MyModal closeSetter={()=>setIsModalActive(false)}>
                        <AddNewContact editContact={context?.service.InputsValue} closeSetter={()=>setIsModalActive(false)}/>
                    </MyModal>
                ):("")}
            </section>
            <section className="contacts-list">
                {context?.contacts?.Contacts.map((item)=>
                    <Contact Contact={item} key={item.id} modalController={()=>showHideModal()}/>
                )}
            </section>
        </div>
    );
});

export default Contacts;
