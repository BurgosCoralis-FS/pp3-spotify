import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import LoginPage from "./Pages/LoginPage"
import Dashboard from "./Pages/Dashboard"

function App() {
  return (
    <section>
      <Routes>
        <Route path='/' exact element={<LoginPage />} />
        <Route path='/dashboard' exact element={<Dashboard />} />
      </Routes>
    </section>
  );
}

export default App;