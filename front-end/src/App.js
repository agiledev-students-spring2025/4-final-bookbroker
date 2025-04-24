// App.js
// I moved the routing to AppContent.js for uselocation to work (for navbar)
import { BrowserRouter as Router } from 'react-router-dom';
import AppContent from './AppContent';

const App = () => (
  <Router basename={process.env.PUBLIC_URL}>
    <AppContent />
  </Router>
);

export default App;