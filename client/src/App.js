import Container from '@mui/material/Container';
import { Header } from './components';
import { Home } from './pages/Home';
function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Home />
      </Container>
    </>
  );
}

export default App;
