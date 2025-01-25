
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.jsx'
import NavBar from './components/NavBar.jsx'
import Body from './components/Body.jsx'
import Profile from './components/Profile.jsx'
import Login from './components/Login.jsx'
import { Provider } from 'react-redux'
import appStore from './utils/appStore.js'
import Feed from './components/Feed.jsx'
import Connections from './components/Connections.jsx'
import Requests from './components/Requests.jsx'
import Chat from './components/Chat.jsx'


function App() {
  
  return (
    <Provider store={appStore}>
   <BrowserRouter basename='/'>
   <Routes>
   <Route path="/" element={<Body/>}>
   <Route path="/" element={<Feed/>}/>
   <Route path="/login" element={<Login/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/connections" element={<Connections/>}/>
    <Route path="/requests" element={<Requests/>}/>
    <Route path="/chat/:targetUserId" element={<Chat/>}/>
   </Route>
    
   </Routes>
   </BrowserRouter>
   </Provider>
  )
}

export default App
