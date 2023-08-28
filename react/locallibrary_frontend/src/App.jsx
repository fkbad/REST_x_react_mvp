import Getter from './components/Getter'
import BookForm from './components/BookForm'
import 'bootstrap/dist/css/bootstrap.min.css';
import { styled } from 'styled-components';
import './index.css'

const Background = styled.div`
`;

function App() {
  return (
    <Background>
      <p> Homepage for accessing react MVP
      </p>
      <BookForm />
      <Getter />
    </Background>
  );
}

export default App
