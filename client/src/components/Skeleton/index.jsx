import React from 'react';
import ContentLoader from 'react-content-loader';
import { useTheme } from 'styled-components';

const Skeleton = (props) => {
  const res = {
    large: {
      height: 807,
      width: 1000,
    },
    medium: {
      height: 320,
      width: 400,
    },
    sm: {
      height: 220,
      width: 300,
    },
  };

  const theme = useTheme();

  return (
    <ContentLoader
      viewBox="0 0 400 320"
      height={res[props.type].height}
      width={res[props.type].width}
      backgroundColor={theme.bg}
      foregroundColor={theme.bgDarkLight}
      {...props}
    >
      <rect x="16" y="17" rx="2" ry="2" width="360" height="200" />
      <circle cx="35" cy="248" r="20" />
      <rect x="69" y="229" rx="2" ry="2" width="275" height="15" />
      <rect x="69" y="253" rx="2" ry="2" width="140" height="15" />
    </ContentLoader>
  );
};

export default Skeleton;
