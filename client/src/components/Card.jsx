import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {format} from "timeago.js";
import axios from "axios";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const ThumbNail = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background: grey;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  gap: 15px;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  flex: 1;
`;
const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: ${(props) => (props.type === "sm" ? "none" : "block")};
`;

const Description = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`;

const Author = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const Views = styled.div`
  color: ${({ theme }) => theme.text};
`;

function Card({ type, video }) {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const { data } = await axios.get(`/users/find/${video.userId}`);
      setChannel(data);
    };

    fetchChannel();
  }, [video.userId]);


  return (
      <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
        <Container type={type}>
          <ThumbNail type={type} src={video.imgUrl} />
          <Details>
            <Avatar type={type} src={channel.img} />
            <Description>
              <Title>{video.title}</Title>
              <Author>{channel.name}</Author>
              <Views>
                {video.views} views - {format(video.createdAt)}
              </Views>
            </Description>
          </Details>
        </Container>
      </Link>
  );
}

export { Card };
