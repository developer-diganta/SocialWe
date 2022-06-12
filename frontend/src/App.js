import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin_up from './Signup/Signin_up';
import Signin_in from './Signup/Signin_in';
import Profile from './Profile/Profile';
import EditProfile from './Profile/EditProfile';
import FriendList from './Friends/FriendList';
import CreatePost from './Posts/CreatePost';
import RequestList from './Friends/RequestList';
import Post from './Posts/Post';
import Home from './Home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signin_up />} />
          <Route path='/signin' element={<Signin_in />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/updateprofile' element={<EditProfile />} />
          <Route path='/profile/friends' element={<FriendList />} />
          <Route path='/profile/requests' element={<RequestList />} />
          <Route path='/profile/createpost' element={<CreatePost />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
