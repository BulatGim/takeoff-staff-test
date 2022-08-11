import {AUTH_ROUTE, CONTACTS_ROUTE} from "../utils/consts";
import Contacts from "../pages/Contacts/Contacts";
import Auth from "../pages/Auth/Auth";


export const authRoutes = [
    {
        path: CONTACTS_ROUTE,
        Element: <Contacts />
    },
]

export const publicRoutes = [
    {
        path: AUTH_ROUTE,
        Element: <Auth />
    },
]