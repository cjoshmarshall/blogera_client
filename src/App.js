import Header from "./components/Header";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import NewPost from "./pages/NewPost";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Topbar from "./components/Topbar";
import Error from "./pages/Error";
import { BrowserRouter, Redirect, Route , Switch } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./store";


function App() {
  const {user}=useContext(Context)

  return (
    <BrowserRouter>
      {user?<Header/>:<Topbar />}
      <Switch>
        <Route path='/' exact>{user?<Home />:<Login />}</Route>     
        <Route path='/blogs/:postId'>{user?<Blog />:<Login />}</Route>
        <Route path='/create'>{user?<NewPost />:<Login />}</Route>
        <Route path='/settings'>{user?<Settings />:<Login />}</Route>
        <Route path='/login'><Login /></Route>
        <Route path='/signup'><Signup /></Route>
        
        <Route path='*'><Error /></Route>
      </Switch>
    </BrowserRouter>
    
  );
}

export default App;
