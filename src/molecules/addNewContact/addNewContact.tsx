import React, {FC, useCallback, useContext, useState} from 'react';
import close from "./imgs/close-circled.svg"
import "./addNewContact.scss"
import FormInput from "../../atoms/formInput/formInput";
import {IContact, IUserError} from "../../types/types";
import MyButton from "../../atoms/myButton/myButton";
import {Context} from "../../index";
import {useUserError} from "../../hooks/useUserErrors";
import {observer} from "mobx-react-lite";

interface IAddNewContactProps {
    closeSetter: () => void;
    editContact?: IContact;
}

const AddNewContact: FC<IAddNewContactProps> = observer(({closeSetter, editContact}) => {

    let context = useContext(Context)

    const [userErrors, setUserErrors] = useState<IUserError[] | []>([])

    const {showUserError, hideUserError} = useUserError(userErrors, setUserErrors)

    
    const [values, setValues] = useState<IContact>(editContact || {
        name: "",
        surname: "",
        email: "",
        phone: "",
        id: context?.contacts.Contacts.length
    });

    const [, updateState] = useState<undefined | object>();
    const forceUpdate = useCallback(() => updateState({}), []);

    function emailValidation() {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return (values.email === "")
            ? showUserError("email", "Email не может быть пустым")
            : hideUserError("email")
            || (!regex.test(String(values.email).toLowerCase()))
                ? showUserError("email", "Некорректный email")
                : hideUserError("email")
    }

    function nameValidation() {
        values.name ? hideUserError("name") : showUserError("name", "Имя не может быть пустым")
    }

    function phoneValidation() {
        values.phone ? hideUserError("phone") : showUserError("phone", "phone не может быть пустым")
    }

    function addEditContact() {
        nameValidation();
        emailValidation();
        phoneValidation();
        setUserErrors(userErrors)
        forceUpdate()
        if (userErrors.length === 0) {
            context?.contacts.editContact(values);
            context?.service.deleteInputValue();
            closeSetter();
        }
    }

    return (
        <div className="addNewContact">
            <img className="addNewContact__close" src={close} alt="" onClick={() => {
                context?.service.deleteInputValue()
                closeSetter();
            }}/>
            <FormInput errors={userErrors} name={"name"} value={values.name || ""} placeholder={"Введите имя"} width={25}
                       setter={setValues} values={values}/>
            <FormInput errors={userErrors} name={"surname"} value={values.surname || ""} placeholder={"Введите фамилию"}
                       width={25} setter={setValues} values={values}/>
            <FormInput errors={userErrors} name={"email"} value={values.email || ""} placeholder={"Введите email"}
                       width={25} setter={setValues} values={values}/>
            <FormInput errors={userErrors} name={"phone"} value={values.phone || ""} placeholder={"Введите телефон"}
                       width={25} setter={setValues} values={values}/>
            <MyButton callBack={() => addEditContact()}>
                <h3>{editContact?.name ? ("Редактировать контакт") : ("Добавить новый контакт")}</h3>
            </MyButton>
        </div>
    );
});

export default AddNewContact;