import React from 'react';
import {
  Author,
  Base,
  CardLinks,
  Container,
  Thumbnail,
  ThumbnailBox,
  Title,
  ViewsAndDate,
} from './styles/card';

export default function Card({ children, type, ...restProps }) {
  return (
    <Container {...restProps} type={type}>
      {children}
    </Container>
  );
}

Card.Link = function CardLink({ to, children, ...restProps }) {
  return (
    <CardLinks to={to} {...restProps}>
      {children}
    </CardLinks>
  );
};

Card.ThumbnailBox = function CardThumbnailBox({ children, type, ...restProps }) {
  return (
    <ThumbnailBox {...restProps} type={type}>
      {children}
    </ThumbnailBox>
  );
};

Card.Thumbnail = function CardThumbnail({ src, type, ...restProps }) {
  return <Thumbnail {...restProps} src={src} type={type} />;
};

Card.Base = function CardBase({ children, ...restProps }) {
  return <Base {...restProps}>{children}</Base>;
};

Card.Title = function CardTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Card.Author = function CardAuthor({ children, ...restProps }) {
  return <Author {...restProps}>{children}</Author>;
};

Card.ViewsAndDate = function CardViewsAndDate({ children, ...restProps }) {
  return <ViewsAndDate {...restProps}>{children}</ViewsAndDate>;
};
