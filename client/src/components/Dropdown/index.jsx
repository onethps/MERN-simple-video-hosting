import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Dropdown = styled.div`
  position: relative;
  color: #333;
  cursor: default;
  width: 100%;
`;

const Control = styled.div``;

const Arrow = styled.div`
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

const Input = styled.input`
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
const SelectedValue = styled.div``;

const Options = styled.div`
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

const Option = styled.div`
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

const DropDown = ({ options, prompt, value, onChange, id, label }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    document.addEventListener('click', close);
    // eslint-disable-next-line no-undef
    return () => document.removeEventListener('click', close);
  }, []);

  const close = (e) => {
    setOpen(e && e.target === ref.current);
  };

  const filter = (options) =>
    options.filter(
      (option) => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1,
    );

  const displayValue = () => {
    if (query.length > 0) return query;
    if (value) return value;
    return '';
  };

  return (
    <Dropdown>
      <Control onClick={() => setOpen((prev) => !prev)}>
        <SelectedValue>
          <Input
            type="text"
            ref={ref}
            placeholder={value ? value[label] : prompt}
            value={displayValue()}
            onChange={(e) => {
              setQuery(e.target.value);
              onChange(null);
            }}
            onClick={() => setOpen((prev) => !prev)}
          />
        </SelectedValue>
        <Arrow className={` ${open ? 'open' : null}`} />
      </Control>
      <Options className={` ${open ? 'open' : null}`}>
        {filter(options).map((option) => (
          <Option
            key={option[id]}
            className={` ${value === option ? 'selected' : null}`}
            onClick={() => {
              onChange(option.name);
              setOpen(false);
              setQuery('');
            }}
          >
            {option[label]}
          </Option>
        ))}
      </Options>
    </Dropdown>
  );
};

export default DropDown;
