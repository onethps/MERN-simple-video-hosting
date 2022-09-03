import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: relative;
  color: #333;
  cursor: default;
  width: 100%;
`;

export const Control = styled.div``;

export const Arrow = styled.div`
  border-color: #999 transparent transparent;
  border-style: solid;
  border-width: 5px 5px 0;
  content: ' ';
  display: block;
  height: 0;
  margin-top: 0.3rem;
  position: absolute;
  right: 10px;
  top: 14px;
  width: 0;

  &.open {
    border-color: transparent transparent #999;
    border-width: 0 5px 5px;
  }
`;

export const Input = styled.input`
  line-height: 1.5;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.hoverColor};
  color: ${({ theme }) => theme.text};
  border: none;
  box-sizing: border-box;
  cursor: default;
  outline: none;
  border-radius: 10px;
  padding: 8px 52px 8px 10px;
  transition: all 200ms ease;
  width: 100%;
`;
export const SelectedValue = styled.div``;

export const Options = styled.div`
  display: none;
  background-color: ${({ theme }) => theme.hoverColor};
  border: 1px solid #ccc;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  margin-top: 5px;
  max-height: 200px;
  overflow-y: auto;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 1000;
  -webkit-overflow-scrolling: touch;

  &.open {
    display: block;
  }
`;

export const Option = styled.div`
  box-sizing: border-box;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  display: block;
  padding: 8px 10px;

  &.selected {
    background-color: #f2f9fc;
    color: #333;
  }

  &:hover {
    background: ${({ theme }) => theme.hoverColorLighter};
    color: ${({ theme }) => theme.text};
  }
`;
