import React from 'react';
import {
  Avatar,
  Buttons,
  Cancel,
  Container,
  Input,
  InputRow,
  ListCommentsBox,
  SubmitButton,
} from './styles/newcommentbox';

const Comments = ({ children, ...restProps }) => {
  return <Container {...restProps}>{children}</Container>;
};

Comments.InputRow = function RowInputComments({ children, ...restProps }) {
  return <InputRow {...restProps}>{children}</InputRow>;
};

Comments.Avatar = function AvatarComments({ src = '/', ...restProps }) {
  return <Avatar {...restProps} src={src} />;
};

Comments.Input = function InputComments({ ...restProps }) {
  return <Input {...restProps} />;
};

Comments.Buttons = function ButtonsComments({ children, ...restProps }) {
  return <Buttons {...restProps}>{children}</Buttons>;
};

Comments.CancelButton = function CancelButton({ ...restProps }) {
  return <Cancel {...restProps}>Cancel</Cancel>;
};

Comments.SubmitButton = function CancelButton({ type = 'active', ...restProps }) {
  return (
    <SubmitButton {...restProps} type={type}>
      Submit
    </SubmitButton>
  );
};

Comments.List = function ListComments({ children, ...restProps }) {
  return <ListCommentsBox {...restProps}>{children}</ListCommentsBox>;
};

export default Comments;
