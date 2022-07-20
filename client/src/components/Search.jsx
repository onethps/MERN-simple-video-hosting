import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import styled from 'styled-components';
import { useDebounce } from 'utils/useDebounce';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Input = styled.input`
  padding: 0 10px;
  width: 100%;
  outline: none;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.text};
`;

const SearchBox = styled.div`
  position: absolute;
  align-items: center;
  left: 0;
  border: 1px solid ${({ theme }) => theme.text};
  right: 0;
  margin: auto;
  color: ${({ theme }) => theme.text};
  padding: 5px;
  display: flex;
  justify-content: space-between;
  width: 40%;
`;

const Container = styled.div``;

const Suggestions = styled.div`
  position: absolute;
  top: 35px;
  left: 0;
  background-color: darkred;
  width: 100%;
  z-index: 5;
`;

const CurrentSuggestion = styled.div`
  cursor: pointer;
`;

const Search = () => {
  const [search, setSearch] = useState('');
  const debounce = useDebounce(search);

  const nav = useNavigate();

  console.log(search);

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchQueryVideos = async () => {
      const { data } = await axios.get(`/videos/search/?q=${search}`);
      setSuggestions(data);
    };

    if (search) {
      fetchQueryVideos();
    }
  }, [debounce]);

  const onSearchHandle = (e) => {
    setSearch(e.currentTarget.value);
  };

  const onClickSearchHandle = () => {
    nav(`search/?q=${search}`);
    setSuggestions([]);
  };

  return (
    <Container>
      <SearchBox>
        <Input placeholder={'search'} value={search} onChange={onSearchHandle} />
        <AiOutlineSearch
          style={{ cursor: 'pointer' }}
          size={'20px'}
          onClick={onClickSearchHandle}
        />
        <Suggestions>
          {suggestions &&
            suggestions.splice(0, 5).map((suggestion) => (
              <CurrentSuggestion
                key={suggestion._id}
                onClick={() => nav(`/video/${suggestion._id}`)}
              >
                {suggestion.title}
              </CurrentSuggestion>
            ))}
        </Suggestions>
      </SearchBox>
    </Container>
  );
};

export default Search;