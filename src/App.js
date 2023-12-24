import logo from './logo.svg';
import './App.css';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { UserData } from './components/UserData';

function App() {
  return (
    <div className="App">
      <UserData />
    </div>
  );
}

export default App;
