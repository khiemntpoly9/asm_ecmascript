import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    document.title = 'Trang chủ';
  });
  return <div>Home</div>;
};

export default Home;
