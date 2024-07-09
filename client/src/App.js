import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// Components
import Timeline from './Components/Timeline';

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<Timeline/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
