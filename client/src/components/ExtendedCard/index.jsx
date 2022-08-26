import {
  Container,
  Thumbnail,
  Title,
  ViewsAndData,
  ProfileName,
  ProfileImage,
  ProfileBlock,
  Desc,
  VideoTextContainer,
} from './styles/extendedcard';
import React from 'react';

const ExtendedCard = ({ video }) => {
  return (
    <Container>
      <Thumbnail src={'/'} />

      <VideoTextContainer>
        <Title>Title</Title>
        <ProfileBlock>
          <ProfileImage />
          <ProfileName>Profile Name</ProfileName>
        </ProfileBlock>

        <ViewsAndData>24k views 8 hours ago</ViewsAndData>

        <Desc>
          Here is few descriptions words to provide example and create new component
        </Desc>
      </VideoTextContainer>
    </Container>
  );
};

export default ExtendedCard;
