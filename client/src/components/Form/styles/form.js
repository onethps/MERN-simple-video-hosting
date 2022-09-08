import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20vw;
`;

export const Input = styled.input`
  margin: 5px 0;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  width: 100%;
  padding: 15px;
  background-color: ${({ theme }) => theme.bgMediumLight};
  color: ${({ theme }) => theme.text};
  outline: none;
`;

export const FormTitle = styled.h1`
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

export const Label = styled.label`
  display: block;
  width: 100%;
  text-align: left;
  padding: 10px;
  color: ${({ theme }) => theme.text};
`;

export const TextArea = styled.textarea`
  margin: 20px 0;
  font-size: 16px;
  width: 100%;
  padding: 15px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bgMediumLight};
  border-radius: 10px;
  border: none;
  outline: none;
  resize: none;
`;

export const Section = styled.h2`
  color: ${({ theme }) => theme.text};

  width: 100%;
  text-align: center;
  border-bottom: 1px solid white;
  line-height: 0.1em;
  margin: 25px 0 20px;

  & span {
    background-color: ${({ theme }) => theme.bg};
    padding: 0 10px;
  }
`;

export const SubmitBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const SubmitButton = styled.button`
  margin-top: 20px;
  font-size: 18px;
  padding: 10px 80px;
  border-radius: 10px;
  border: none;
  font-weight: 700;
  background-color: ${({ theme }) => theme.logoColor};
  color: ${({ theme }) => theme.text};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.logoColorHover};
  }
`;
