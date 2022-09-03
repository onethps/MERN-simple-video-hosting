import React from 'react';
import { Loader, Box } from './styles/loader';

const Spinner = () => {
  return (
    <Box>
      <Loader className={'loader'}>Loading...</Loader>
    </Box>
  );
};

export default Spinner;
