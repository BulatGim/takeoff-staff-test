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