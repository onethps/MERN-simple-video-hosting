import React from 'react';
import {
  Container,
  Input,
  Label,
  SubmitButton,
  TextArea,
  FormTitle,
  Section,
  SubmitBox,
  TextWithLink,
  LinkItem,
  ErrorMessage,
} from './styles/form';

const Form = ({ children, ...restProps }) => {
  return <Container {...restProps}>{children}</Container>;
};

Form.Title = function FormTitleText({ children, ...restProps }) {
  return <FormTitle {...restProps}>{children}</FormTitle>;
};

Form.Label = function LabelForm({ children, ...restProps }) {
  return <Label {...restProps}>{children}</Label>;
};

Form.Input = function InputForm({ error, ...restProps }) {
  return <Input error={error} {...restProps} />;
};

Form.TextArea = function TextAreaForm({ ...restProps }) {
  return <TextArea {...restProps} />;
};

Form.Submit = function SubmitForm({ children, ...restProps }) {
  return (
    <SubmitBox {...restProps}>
      <SubmitButton>{children}</SubmitButton>
    </SubmitBox>
  );
};
Form.TextWithLink = function TextWithLinkForm({ text, linkedText, link, ...restProps }) {
  return (
    <TextWithLink {...restProps}>
      {text}
      <LinkItem to={link}>{linkedText}</LinkItem>
    </TextWithLink>
  );
};

Form.ErrorMessage = function ErrorMessageForm({ children, ...restProps }) {
  return <ErrorMessage {...restProps}>{children}</ErrorMessage>;
};

Form.Section = function SectionForm({ children = 'sample', ...restProps }) {
  return (
    <Section {...restProps}>
      <span>{children}</span>
    </Section>
  );
};

export default Form;
