import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar.jsx'
import Home from './Pages/Home/Home.jsx';
import Videos from './Pages/Videos/Videos.jsx';
import {Route, Routes} from 'react-router-dom';

function App() 
{
    const [sidebar,setSidebar] = useState(true);


    return (
        <div>
            <Navbar setSidebar={setSidebar}/>
            <Routes>
                <Route path='/' element={<Home sidebar={sidebar} />}></Route>
                <Route path='/Videos/:categoryId/:videoId' element={<Videos/>}></Route>
            </Routes>
        </div>
    )
}

export default App;
