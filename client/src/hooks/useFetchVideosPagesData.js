import { instance } from 'api/config';
import { useEffect, useState } from 'react';

export const useFetchVideosPagesData = (category) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        // eslint-disable-next-line no-undef
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }
  };
  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => document.removeEventListener('scroll', scrollHandler);
  }, []);

  useEffect(() => {
    if (videos.length > 0 && videos.length === totalCount) {
      return;
    }
    const fetchVideosData = async () => {
      try {
        setLoading(true);
        const { data } = await instance.get(`videos/${category}?page=${currentPage}`);
        setVideos([...videos, ...data.items]);
        setTotalCount(data.pagination.count);
        setCurrentPage((prev) => prev + 1);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
        setFetching(false);
      }
    };

    if (fetching) {
      fetchVideosData().catch((err) => console.log(err));
    }
  }, [fetching]);

  return { videos, loading };
};
