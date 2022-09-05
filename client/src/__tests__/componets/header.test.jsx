import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Header } from 'components';
import Button from 'components/Button';
import {
  Border,
  ButtonLabel,
  LogoTitle,
  SearchIcon,
  UploadButton,
} from 'components/Header/styles/header';
import { HEADER_MENU_PROFILE_ITEMS } from 'constants/constants';
import { SIGN_IN_ROUTE } from 'constants/routes';
import React from 'react';
import { AiFillYoutube } from 'react-icons/ai';
import { RiUploadCloudLine, RiVideoUploadLine } from 'react-icons/ri';
import { BrowserRouter as Router } from 'react-router-dom';

describe('<Card />', () => {
  const type = 'sm';

  const user = {
    _id: '55',
    name: 'Victor',
  };

  const desc =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dolores eius expedita harum illum impedit iatem';

  const desc1 =
    'Lorem ipsumww dolor sit amet, consectetur adipisicing elit. Aspernatur dolores eius expedita harum illum impedit iatem';

  const cardVideos = [
    {
      _id: '1',
      imgUrl: 'https://www.google.com/1',
      title: 'Video 1',
      views: '10',
      userId: '55',
      desc: desc,
      createdAt: new Date().toLocaleString(),
    },
    {
      _id: '2',
      imgUrl: 'https://www.google.com/2',
      title: 'Video 2',
      views: '50',
      userId: '12',
      desc: desc1,
      createdAt: new Date().toLocaleString(),
    },
  ];

  it('renders the Basic <Header/>', () => {
    const profileStatus = false;

    const { getByText, container } = render(
      <Router>
        <Header>
          <Header.Frame setUploadModal={() => {}} uploadModal={false}>
            <Header.LeftButtonsGroup>
              <Header.GamburgerMenu onClick={() => {}} />
              <Header.Logo>
                <AiFillYoutube onClick={() => {}} />
                <LogoTitle onClick={() => {}}>utube</LogoTitle>
              </Header.Logo>
            </Header.LeftButtonsGroup>

            <Header.Search openSearch={false} onCloseSearch={() => {}} />

            {user ? (
              <Header.RightButtonsGroup>
                {/*show this icon if min-with tabletL*/}
                <SearchIcon onClick={false} />
                <UploadButton onClick={() => {}}>
                  <RiUploadCloudLine />
                  <ButtonLabel>Upload</ButtonLabel>
                </UploadButton>

                <Header.Avatar src={'/avatar.img'} onClick={() => {}} />

                {profileStatus ? (
                  <Header.ProfileModal setOpenProfileMenu={() => {}}>
                    <Header.ProfileModalHeader
                      avatarUrl={'/avatar.img'}
                      userName={'test'}
                      userDesc={'0 test'}
                    />
                    <Border />

                    <Header.ProfileBoxItem
                      title={HEADER_MENU_PROFILE_ITEMS.MY_CHANNEL}
                      icon={<RiVideoUploadLine size={30} />}
                      action={() => {}}
                    />
                    <Header.ProfileBoxItem
                      title={HEADER_MENU_PROFILE_ITEMS.DARK_MODE}
                      icon={<RiVideoUploadLine size={30} />}
                      action={() => {}}
                    />
                    <Header.ProfileBoxItem
                      title={HEADER_MENU_PROFILE_ITEMS.EXIT}
                      icon={<RiVideoUploadLine size={30} />}
                      action={() => {}}
                    />
                  </Header.ProfileModal>
                ) : null}
              </Header.RightButtonsGroup>
            ) : (
              <Header.RightButtonsGroup>
                <Button src={SIGN_IN_ROUTE} title={'Sign In'} />
              </Header.RightButtonsGroup>
            )}
          </Header.Frame>
        </Header>
      </Router>,
    );

    screen.debug();
  });
});
