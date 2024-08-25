import './App_init.css';
import Home from "./page/home";
import SignIn from "./page/account";
import SignUp from './page/account/signUp';
import Main from './component/Home_content'
import View from './component/item_list';
import Detail from './component/detail';
import Upload from './component/upload';
import MyPage from './component/myPage';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>}>
            <Route path='' element={<Main/>}/>
            <Route path='view' element={<View/>}/>
            <Route path='view/:id' element={<Detail/>}/>
            <Route path='upload' element={<Upload/>}/>
            <Route path='edit/:id' element={<Upload/>}/>
            <Route path='myPage' element={<MyPage/>}/>
          </Route>
          <Route path='/account/' element={<SignIn/>}/>
          <Route path='/account/signUp' element={<SignUp/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;