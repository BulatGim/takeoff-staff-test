import {FC, MouseEventHandler, ReactNode} from 'react';
import "./myButton.scss"

interface IMyButton {
    children: ReactNode;
    color?: string;
    callBack: ()=>void;
}

const MyButton:FC<IMyButton> = ({children, color, callBack}) => {
    return (
        <button className="myButton" onClick={callBack}>{children}</button>
    );
};

export default MyButton;