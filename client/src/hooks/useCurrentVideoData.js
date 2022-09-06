import { useEffect, useState } from 'react';
import { instance } from 'api/config';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { VideoFailure, VideoStart, VideoSuccess } from 'redux/videoSlice';

export const useCurrentVideoData = (id) => {
  const [videoOwner, setVideoOwner] = useState({});
  const [recommendations, setRecommendations] = useState(null);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      dispatch(VideoStart());
      try {
        const video = await instance.get(`/videos/find/${id}`);
        const user = await instance.get(`/users/find/${video.data.userId}`);
        // fetch data for recomendations
        const { data } = await instance.get(`/videos/random/`);
        //
        // increase +1 view
        await instance.put(`/videos/view/${id}`);
        //
        setRecommendations(data);
        setVideoOwner(user.data);
        dispatch(VideoSuccess(video.data));
      } catch (e) {
        dispatch(VideoFailure());
      }
    };
    fetchUserData().catch((err) => console.log(err));
  }, [location]);

  return { videoOwner, recommendations };
};
