import React, {FC, useContext} from 'react';
import MyButton from "../../atoms/myButton/myButton";
import {IContact} from "../../types/contextTypes";
import {Context} from "../../index";
import "./contact.scss"

interface IContactProps {
    Contact: IContact;
    modalController: ()=>void;
}

const Contact:FC<IContactProps> = ({ Contact, modalController}) => {

    let context = useContext(Context);

    return (
        <div key={Contact.id} className="contact">
            <div className="contact-data">
                <p className="contact-data__item contact-data__item_name">{Contact.name}</p>
                <span className="contact-data__item contact-data__item_surname">{Contact.surname}</span>
                <p className="contact-data__item contact-data__item_email">{Contact.email}</p>
                <p className="contact-data__item contact-data__item_phone">{Contact.phone}</p>
            </div>
            <div className="contact__actions">
                <MyButton callBack={()=> {
                    context?.service.setInputsValue(Contact);
                    modalController();
                }}>
                    <p>Редактировать</p>
                </MyButton>
                <MyButton callBack={()=>context?.contacts.deleteContact(Contact)}>
                    <p>Удалить</p>
                </MyButton>
            </div>
        </div>
    );
};

export default Contact;