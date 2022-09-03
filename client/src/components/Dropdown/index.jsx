import React, { useEffect, useRef, useState } from 'react';
import {
  Arrow,
  Control,
  DropdownContainer,
  Input,
  Option,
  Options,
  SelectedValue,
} from './styles/dropdown';

export default function Dropdown({ options, prompt, value, onChange, id, label }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener('click', close);
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
    <DropdownContainer>
      <Control onClick={() => setOpen((prev) => !prev)}>
        <SelectedValue>
          <Input
            data-testid="dropdown-input"
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
            data-testid="option"
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
    </DropdownContainer>
  );
}
