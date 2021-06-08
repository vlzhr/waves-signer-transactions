import React, { useRef, useContext, useState, useEffect, FC } from 'react';
import ReactDOM from "react-dom";
import './Modal.scss';

const Context = React.createContext<HTMLDivElement | null>(null);

export const ModalProvider: FC = ({ children }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [modalNode, setModalNode] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        if (modalRef.current) {
            setModalNode(modalRef.current);
        }
    }, [modalRef.current]);

    return (
        <div className='container'>
            <Context.Provider value={modalNode}>{children}</Context.Provider>
            <div ref={modalRef} />
        </div>
    );
}

interface ModalProps {
    onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ onClose, children, ...props }) => {
    const modalNode = useContext(Context);

    return modalNode
        ? ReactDOM.createPortal(
            <div className='overlay'>
                <div className='dialog'>
                    {children}
                </div>
            </div>,
            modalNode
        )
        : null;
}
