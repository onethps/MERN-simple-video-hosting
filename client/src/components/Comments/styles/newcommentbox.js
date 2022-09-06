import styled from 'styled-components';

export const Container = styled.div``;

export const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 50px;
`;

export const Avatar = styled.img`
  min-width: 50px;
  height: 50px;
  background-color: grey;
  border-radius: 100px;
`;

export const ChannelName = styled.h1``;

export const Input = styled.input`
  border: none;
  background: transparent;
  width: 100%;
  border-bottom: 1px solid grey;
  outline: none;
  color: ${({ theme }) => theme.text};
  padding: 10px 20px;
`;

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
`;

export const ListCommentsBox = styled.div``;

export const SubmitButton = styled.button`
  text-transform: uppercase;
  padding: 10px 25px;
  border: none;
  background-color: ${(props) => (props.type === 'active' ? props.theme.logoColor : '')};
  color: ${(props) => (props.type === 'active' ? 'white' : '')};
`;

export const Cancel = styled.button`
  text-transform: uppercase;
  padding: 10px 25px;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.text};
`;
