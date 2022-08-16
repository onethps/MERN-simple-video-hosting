import React, { useState } from 'react';
import { GoTriangleDown } from 'react-icons/go';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Photo,
  Popup,
  SLink,
  SLinkContainer,
  SLinkIcon,
  SLinkLabel,
  TextItem,
  TittleCategory,
  UserBox,
  Wrapper,
} from './styles/sidebar';

const Sidebar = ({ children, isOpen }) => {
  return <Container isOpen={isOpen}>{children}</Container>;
};

Sidebar.Frame = function SidebarFrame({ children, ...restProps }) {
  return <Wrapper {...restProps}>{children}</Wrapper>;
};

Sidebar.Profile = function SidebarProfile({ children, ...restProps }) {
  return <UserBox {...restProps}>{children}</UserBox>;
};

Sidebar.ProfilePhoto = function ProfilePhoto({ src, ...restProps }) {
  return <Photo {...restProps} src={src} />;
};

Sidebar.ProfileName = function SidebarProfileName({ children, ...restProps }) {
  return <TextItem {...restProps}>{children}</TextItem>;
};

Sidebar.Dropdown = function SidebarDropDown({ children, dropdownTitle, ...restProps }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: 'flex' }} {...restProps} onClick={() => setOpen(!open)}>
      <TextItem>{dropdownTitle}</TextItem>
      <GoTriangleDown />
      {open && <Popup>{children}</Popup>}
    </div>
  );
};

Sidebar.DropdownItem = function SidebarDropDownItem({ title, ...restProps }) {
  return <TextItem {...restProps}>{title}</TextItem>;
};

Sidebar.CategoryTitle = function CategoryTitle({ title, ...restProps }) {
  return <TittleCategory {...restProps}>{title}</TittleCategory>;
};

Sidebar.LinkContainer = function SidebarLinkContainer({ label, src, sidebarOpen, icon }) {
  const { pathname } = useLocation();

  return (
    <SLinkContainer key={label} isActive={pathname === src}>
      <SLink to={src} style={!sidebarOpen ? { width: `fit-content` } : {}}>
        <SLinkIcon>{icon}</SLinkIcon>
        {sidebarOpen && (
          <>
            <SLinkLabel>{label}</SLinkLabel>
          </>
        )}
      </SLink>
    </SLinkContainer>
  );
};

export default Sidebar;
