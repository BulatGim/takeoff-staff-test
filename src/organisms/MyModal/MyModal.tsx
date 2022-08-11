import {FC, ReactNode} from 'react';
import "./MyModal.scss"

interface IModalProps {
    children: ReactNode;
    closeSetter: ()=>void;
}

const MyModal:FC<IModalProps> = ({children, closeSetter}) => {
    return (
        <div className="MyModal" onClick={closeSetter}>
            <div className="MyModal-container" onClick={(e)=>e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;