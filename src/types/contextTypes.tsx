

export interface IContext {
    user: IUserStore;
    contacts: IContactsStore;
    service: IServiceStore;
}

export interface IUserStore {
    _user: IUser | null;
    User: IUser | null;
    setUser: (user:IUser)=> void
}

export interface IContactsStore {
    _contacts: IContact[];
    Contacts: IContact[];
    addContact: (newContact: IContact)=>void;
    deleteContact: (deletingContact: IContact)=> void;
    editContact: (contact: IContact)=> void;
}

export interface IServiceStore {
    _inputsValue: IContact;
    InputsValue: IContact;
    setInputsValue: (value: IContact)=>void;
    deleteInputValue: ()=>void;
}

export interface IContact {
    name?: string;
    surname?: string;
    email?: string;
    phone?: string;
    id?: number;
}

export interface IUser extends IContact{
    password?:string;
}

export interface IFormValues {
    name?: string;
    password?: string;
}

export interface IUserError {
    formInput:string;
    error: string;
}