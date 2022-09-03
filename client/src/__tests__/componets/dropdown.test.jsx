import '@testing-library/jest-dom';
import { render, screen, fireEvent, getByPlaceholderText } from '@testing-library/react';
import Dropdown from '../../components/Dropdown/index';

describe('<Dropdown />', () => {
  let val = 'val';

  const optionsData = [
    {
      id: '1',
      name: 'Option 1',
    },
    {
      id: '2',
      name: 'Option 2',
    },
    {
      id: '3',
      name: 'Option 3',
    },
  ];

  it('renders the <Dropdown /> with populated data', () => {
    const onChange = jest.fn();

    const { getByText, getByTestId, getAllByTestId, getByRole, container } = render(
      // eslint-disable-next-line react/react-in-jsx-scope
      <Dropdown
        options={optionsData}
        id={'id'}
        value={val}
        label={'name'}
        prompt={'Select'}
        onChange={onChange}
      />,
    );

    const inputEl = getByTestId(/dropdown-input/i);

    expect(getByText(/option 1/i)).toBeInTheDocument();
    expect(getByText(/option 2/i)).toBeInTheDocument();
    expect(getByText(/option 3/i)).toBeInTheDocument();
    expect(getAllByTestId('option').length).toBe(3);
    fireEvent.change(inputEl, {
      target: { value: 'Option 1' },
    });
    fireEvent.change(getByRole('textbox'), 'options 1');
    expect(getAllByTestId('option').length).toBe(1);
    expect(inputEl.value).toBe('Option 1');
    screen.debug();
    expect(container.firstChild).toMatchSnapshot();
  });
});
