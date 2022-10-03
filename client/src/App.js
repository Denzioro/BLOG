import Container from '@mui/material/Container';
import { Header } from './components';
import { Home, FullPost, AddPost, Login, Registration } from './pages';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';

function App() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
