import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Find from "./pages/Find";
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/feed" component={Feed} />
          <Route exact={true} path="/profile" component={Profile} />
          <Route exact={true} path="/find" component={Find} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
