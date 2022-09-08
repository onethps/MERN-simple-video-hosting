import React from 'react';
import { Background, Container, Wrapper } from './styles/modal';

const Modal = ({ children, ...restProps }) => {
  return <Container {...restProps}>{children}</Container>;
};

Modal.Wrapper = function WrapperModal({ children, ...restProps }) {
  return <Wrapper {...restProps}>{children}</Wrapper>;
};

Modal.Backdrop = function BackDropModal({ ...restProps }) {
  return <Background {...restProps} />;
};
export default Modal;
