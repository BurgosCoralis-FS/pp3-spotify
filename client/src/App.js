import Header from "./components/Header"
import Login from "./components/Login"
import Dashboard from "./Pages/Dashboard"
import './App.css'

import { FaSpotify } from 'react-icons/fa'

const code = new URLSearchParams(window.location.search).get('code')

function App() {
  return code ? <Dashboard code={code}/> : (
    <div style={styles.body}>
      <Header /> 
      <div style={styles.container}>
        <FaSpotify style={styles.icon}/>
        <h3 style={styles.heading}>Please Log In</h3>
        <p style={styles.text}>In order to search for artists, tracks, or songs <br />
            you must login to your Spotify account</p>
        <Login />
      </div>
    </div>
  );
}

export default App;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh'
  },
  icon: {
    color: '#1bb954',
    fontSize: '50px',
  },
  heading: {
    color: 'white',
    fontWeight: 'bold'
  },
  text: {
    color: 'white',
    fontSize: '16px',
    fontWeight: '300'
  },
  body: {
    minHeight: '100vh'
  }
}