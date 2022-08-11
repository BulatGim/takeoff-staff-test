import {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {publicRoutes, authRoutes} from "./routes";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const context = useContext(Context);
    return(
        <Routes>
            {context?.user?.User ? (authRoutes.map(({path, Element})=>
                <Route key={path} path={path} element={Element} />
            )):(
                publicRoutes.map(({path, Element})=>
                        <Route key={path} path={path} element={Element} />
                )
            )}
        </Routes>
    );
});

export default AppRouter;