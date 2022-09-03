import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { format } from 'timeago.js';
import Card from '../../components/Card/index';

describe('<Card />', () => {
  const type = 'sm';

  const user = {
    _id: '55',
    name: 'Victor',
  };

  const cardVideos = [
    {
      _id: '1',
      imgUrl: 'https://www.google.com/',
      title: 'Video 1',
      views: '10',
      userId: '55',
      createdAt: new Date().toLocaleString(),
    },
    {
      _id: '2',
      imgUrl: 'https://www.google.com/',
      title: 'Video 2',
      views: '50',
      userId: '12',
      createdAt: new Date().toLocaleString(),
    },
  ];

  it('renders the <Card /> with populated data', () => {
    const { getByText, container } = render(
      <Router>
        <>
          {cardVideos.map((video) => {
            return (
              <Card key={video._id} type={type}>
                <Card.Link to={`/video/${video?._id}`}>
                  <Card.ThumbnailBox>
                    <Card.Thumbnail src={video?.imgUrl} />
                  </Card.ThumbnailBox>
                  <Card.Base>
                    <Card.Title>{video?.title}</Card.Title>
                    <Card.Author>{user?.name}</Card.Author>
                    <Card.ViewsAndDate>
                      {video?.views} views - {format(video?.createdAt)}
                    </Card.ViewsAndDate>
                  </Card.Base>
                </Card.Link>
              </Card>
            );
          })}
        </>
      </Router>,
    );

    expect(getByText('Video 1')).toBeInTheDocument();
    expect(getByText('50 views - just now')).toBeInTheDocument();
    expect(getByText('Video 2')).toBeTruthy();
    expect(getByText('10 views - just now')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });
});
