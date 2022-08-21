import React, { memo } from 'react';
import styled from 'styled-components';
import { Index } from 'components/Card';

const Recommendation = styled.div`
  grid-area: rec;
  background-color: ${({ theme }) => theme.bgLighter};
`;

const Recomendation = memo(({ recommendations }) => {
  return (
    <Recommendation>
      {recommendations?.map((currentVideo) => (
        <Index key={currentVideo._id} type={'sm'} video={currentVideo} />
      ))}
    </Recommendation>
  );
});

export default Recomendation;
