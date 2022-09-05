import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ExtendedCard from 'components/ExtendedCard';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { format } from 'timeago.js';

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

  it('renders the <ExtendedCard /> with populated data', () => {
    jest.mock('react-router-dom', () => {
      return {
        Redirect: jest.fn(({ to }) => `Redirected to ${to}`),
      };
    });

    const { getByText, container } = render(
      <Router>
        <>
          {cardVideos.map((video) => {
            return (
              <ExtendedCard key={video._id}>
                <ExtendedCard.Link
                  to={`/video/${video?._id}`}
                  data-testid="link-test-thumbnail"
                >
                  <ExtendedCard.Thumbnail src={video?.imgUrl} />
                </ExtendedCard.Link>
                <ExtendedCard.Base>
                  <ExtendedCard.Title>{video?.title}</ExtendedCard.Title>
                  <ExtendedCard.ProfileFrame>
                    <ExtendedCard.ProfileImage src={user?.img} />
                    <ExtendedCard.ProfileName>{user?.name}</ExtendedCard.ProfileName>
                  </ExtendedCard.ProfileFrame>
                  <ExtendedCard.ViewsAndData>
                    {video?.views} views - {format(video?.createdAt)}
                  </ExtendedCard.ViewsAndData>
                  <ExtendedCard.Description>{video?.desc}</ExtendedCard.Description>
                </ExtendedCard.Base>
              </ExtendedCard>
            );
          })}
        </>
      </Router>,
    );

    expect(getByText('Video 1')).toBeInTheDocument();
    expect(getByText('50 views - just now')).toBeInTheDocument();
    expect(getByText('Video 2')).toBeInTheDocument();
    expect(getByText('10 views - just now')).toBeInTheDocument();
    expect(getByText('10 views - just now')).toBeInTheDocument();
    expect(getByText(desc)).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});
