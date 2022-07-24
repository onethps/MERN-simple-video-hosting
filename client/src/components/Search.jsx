import React, {useEffect, useState} from 'react';
import {AiOutlineSearch} from 'react-icons/ai';
import styled from 'styled-components';
import {useDebounce} from 'utils/useDebounce';
import {useNavigate} from 'react-router-dom';
import {instance} from "api/config";


const Container = styled.div`
  width: 40%;
  position: relative;
  margin-right: 0;


  @media only screen and (min-width: 992px) {
    margin-right: 30%;
  }
  
`;

const SearchBox = styled.div`
  border: none;
  background-color: ${({theme}) => theme.bgLighter};
  color: ${({theme}) => theme.text};
  border-radius: 10px;
  height: 40px;
  


  & svg {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
    background: red;
    width: 10%;
    color: white;
    padding: 5px;
    border-radius: 0 10px 10px 0;
  }

`;

const Input = styled.input`
  padding: 10px 20px;
  width: 100%;
  outline: none;
  border: none;
  background: transparent;
  color: ${({theme}) => theme.text};
`;



const Suggestions = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  background-color: ${({theme}) => theme.bgLighter};
  width: 100%;
  z-index: 5;
`;

const CurrentSuggestion = styled.div`
  padding: 20px;
  cursor: pointer;

  &:hover {
    background-color: ${({theme}) => theme.bgMediumLight};
  }

`;

const Search = () => {
  const [search, setSearch] = useState('');
  const debounce = useDebounce(search);

  const nav = useNavigate();

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchQueryVideos = async () => {
      const {data} = await instance.get(`/videos/search/?q=${search}`);
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
        <Input placeholder={'Search Video...'} value={search} onChange={onSearchHandle}/>
        <AiOutlineSearch
          size={'30px'}
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