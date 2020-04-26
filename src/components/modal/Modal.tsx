import React, { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './modal.scss';

type ModalProps = {
  children: ReactNode;
}

export const Modal = React.memo(({ children }: ModalProps) => {
  const modalRoot = document.getElementById('modal');
  if(!modalRoot) return null;

  return ReactDOM.createPortal(children, modalRoot);
});
