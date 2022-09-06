import { useEffect, useState } from 'react';
import { instance } from 'api/config';
import { useLocation } from 'react-router-dom';
export const useVideoListData = (link) => {
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const fetchVideosData = async () => {
      setLoading(true);
      try {
        const { data } = await instance.get(`videos/${link}`);
        setLoading(false);
        setVideos(data);
        if (!data.length) {
          setVideos(null);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchVideosData().catch((err) => console.log(err));
  }, [location]);

  return { videos, loading };
};
