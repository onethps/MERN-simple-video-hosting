import { instance } from 'api/config';
import { useEffect, useState } from 'react';

const useFetchCurrentUser = (userId) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await instance.get(`users/find/${userId}`);
      setUser(data);
    };
    fetchUser().catch((err) => console.log(err));
  }, []);

  return { user };
};

export default useFetchCurrentUser;
