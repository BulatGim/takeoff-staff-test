import React, {useContext, useEffect, useState} from 'react';
import "./Contacts.scss"
import {Context} from "../../index";
import MyButton from "../../atoms/myButton/myButton";
import MyModal from "../../organisms/MyModal/MyModal";
import AddNewContact from "../../molecules/addNewContact/addNewContact";
import {observer} from "mobx-react-lite";
import Contact from "../../molecules/contact/contact";

const Contacts = observer(() => {
    const context = useContext(Context)

    const [isModalActive, setIsModalActive] = useState<boolean>(false)

    const [date, setDate] = useState<Date>(new Date())

    const [hours, setHours] = useState<number>(date.getHours())

    const [minutes, setMinutes] = useState<number>(date.getMinutes())

    useEffect(()=>{
        setInterval(()=>{
            setDate(new Date());
            setHours(date.getHours())
            setMinutes(date.getMinutes())
        }, 60000)
        return clearInterval
    }, [])

    function showHideModal() {
        isModalActive?(setIsModalActive(false)): setIsModalActive(true)
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
                <div className="header-time">
                    <h3 className="header-time__hours-minutes">{hours} : {minutes}</h3>
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
