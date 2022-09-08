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

Form.Input = function InputForm({ ...restProps }) {
  return <Input {...restProps} />;
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

Form.Section = function SectionForm({ children = 'sample', ...restProps }) {
  return (
    <Section {...restProps}>
      <span>{children}</span>
    </Section>
  );
};

export default Form;
