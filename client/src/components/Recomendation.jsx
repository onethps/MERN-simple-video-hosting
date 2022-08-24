import Card from 'components/Card';
import React, { memo } from 'react';
import styled from 'styled-components';

const Recommendation = styled.div`
  grid-area: rec;
  background-color: ${({ theme }) => theme.bgLighter};
`;

const Recomendation = ({ recommendations }) => {
  return (
    <Recommendation>
      {recommendations?.map((currentVideo) => (
        <Card key={currentVideo._id} type={'sm'} video={currentVideo} />
      ))}
    </Recommendation>
  );
};

export default Recomendation;
