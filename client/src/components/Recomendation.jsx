import Card from 'components/Card';
import CardContainer from 'containers/card';
import React, { memo } from 'react';
import styled from 'styled-components';

const Recommendation = styled.div`
  grid-area: rec;
  background-color: ${({ theme }) => theme.bg};
`;

const Recomendation = ({ recommendations }) => {
  return (
    <Recommendation>
      {recommendations?.map((currentVideo) => (
        <CardContainer key={currentVideo._id} type={'sm'} video={currentVideo} />
      ))}
    </Recommendation>
  );
};

export default Recomendation;
