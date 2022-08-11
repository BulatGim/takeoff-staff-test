import {IContact, IUser} from "../types/contextTypes";
import {makeAutoObservable} from "mobx";

export default class ContactsStore {
    _contacts: IContact[]

    constructor(){
        this._contacts=[
            { id: 1, name: "John", surname: "Peterson", email: "JohnMail@mail.ru", phone: "8(977)777-77-77" },
            { id: 2, name: "Pete", surname: "JohnSon", email: "PeteMail@mail.ru", phone: "8(977)777-77-77" },
            { id: 3, name: "Ivan", surname: "Petrov", email: "IvanMail@mail.ru", phone: "8(977)777-77-77" },
            { id: 4, name: "Petr", surname: "Vasyin", email: "PetrMail@mail.ru", phone: "8(977)777-77-77" },
            { id: 5, name: "Vasya", surname: "Mashkov", email: "VasyaMail@mail.ru", phone: "8(977)777-77-77" },
            { id: 6, name: "Masha", surname: "Ivanova", email: "MashaMail@mail.ru", phone: "8(977)777-77-77" }
        ];
        makeAutoObservable(this);
    }

    setContacts(user:IContact[]){
        this._contacts = user
    }

    addContact(newContact: IContact){
        newContact.id = this._contacts.length+1;
        this._contacts = [...this._contacts, newContact]
    }

    deleteContact(deletingContact: IContact){
        this._contacts = this._contacts.filter((item)=>item.id !== deletingContact.id)
    }

    editContact(contact: IContact){
        const findContact =():number=> {
            for (let i = this._contacts.length-1; i>=0; i--){
                if (this._contacts[i].id === contact.id){
                    return i
                }
            }
            return -1
        }
        findContact()>=0?(
                this._contacts[findContact()] = contact
            ):(
                this.addContact(contact)
        )
    }

    get Contacts():IContact[]{
        return this._contacts
    }
}