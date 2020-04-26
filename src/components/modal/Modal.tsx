import React, { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './modal.scss';

type ModalProps = {
  children: ReactNode;
}

const Modal = React.memo(({ children }: ModalProps) => {
  const modalRoot = document.getElementById('modal');
  if(!modalRoot) return null;

  const element = document.createElement('div');
  element.setAttribute('class', 'modal');

  useEffect(() => {
    modalRoot.appendChild(element);
    return () => {modalRoot.removeChild(element)};
  }, [element, modalRoot]);

  return ReactDOM.createPortal(children, element);
});

export default Modal;
