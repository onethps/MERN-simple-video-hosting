import React from 'react';
import {
  Base,
  Container,
  Desc,
  ECardLink,
  ProfileBlock,
  ProfileImage,
  ProfileName,
  Thumbnail,
  Title,
  ViewsAndData,
} from './styles/extendedcard';

export default function ExtendedCard({ children }) {
  return <Container>{children}</Container>;
}

ExtendedCard.Thumbnail = function ExtendedCardThumbnail({ src, ...restProps }) {
  return <Thumbnail {...restProps} src={src} />;
};

ExtendedCard.Base = function ExtendedCardBase({ children, ...restProps }) {
  return <Base {...restProps}>{children}</Base>;
};

ExtendedCard.Title = function ExtendedCardTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

ExtendedCard.Link = function ExtendedCardLink({ children, to, ...restProps }) {
  return (
    <ECardLink to={to} {...restProps}>
      {children}
    </ECardLink>
  );
};

ExtendedCard.ProfileFrame = function ExtendedCardProfileFrame({
  children,
  ...restProps
}) {
  return <ProfileBlock {...restProps}>{children}</ProfileBlock>;
};

ExtendedCard.ProfileImage = function ExtendedCardProfileImage({ src, ...restProps }) {
  return <ProfileImage src={src} {...restProps} />;
};

ExtendedCard.ProfileName = function ExtendedCardProfileName({ children, ...restProps }) {
  return <ProfileName {...restProps}>{children}</ProfileName>;
};

ExtendedCard.ViewsAndData = function ExtendedCardViewsAndData({
  children,
  ...restProps
}) {
  return <ViewsAndData {...restProps}>{children}</ViewsAndData>;
};

ExtendedCard.Description = function ExtendedCardDescription({ children, ...restProps }) {
  return <Desc {...restProps}>{children}</Desc>;
};
