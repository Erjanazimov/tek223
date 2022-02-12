import React, {useEffect} from "react";
import "./global.css";
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Students from "./components/Students/Students";
import Glavnaya from "./components/Glavnaya/Glavnaya";
import Navigation from "./components/Navigation/Navigation";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import News from "./components/News/News";
import ModalAccounts from "./components/ModalAccounts/ModalAccounts";
import {useDispatch, useSelector} from "react-redux";
import {entrance_user, getGroups, news, search} from "./redux/actions";
import Personal from "./components/Personal/Personal";
import ErrorPersonal from "./components/ErrorPersonal/ErrorPersonal";
import NewsCategor from "./components/News/NewsCategor/NewsCategor";
import AboutGet from "./components/AboutGet/AboutGet";
import Trainer from "./components/Trainer/Trainer";
import TrainerStories from "./components/Trainer/TrainerStories";


function App() {

const dispatch = useDispatch();
    let getUser = JSON.parse(localStorage.getItem("test"));
    const link = useSelector(state => {
    return state
})
    useEffect(() => {
        let getUser = JSON.parse(localStorage.getItem("test"));
        dispatch(news())
        dispatch(getGroups())
        if(getUser){
            dispatch(entrance_user(getUser))
        }
        dispatch(search())

    }, [])
    
  return (
      <div>
          <Router>
              <Navigation/>
              <Routes>
                  <Route path='/' element={<Glavnaya />} />
                  <Route path='/students' element={<Students />} exact/>
                  <Route path='/news' element={<News />} exact/>
                  {getUser ?
                  <Route path="/personal" element={<Personal />} exact/> :
                      <Route path='/personal' element={<ErrorPersonal />} exact/>
                  }
                  {
                      link.NewsReducer.news.map( item => {
                          return <Route path={ "/news"+item.id} element={<NewsCategor key={item.id} name={item.name}
                                                                                  information={item.information} images={item.images}
                          />} exact/>
                      })
                  }
                  <Route path='/AboutGet' element={<AboutGet/>} exact/>
                  <Route path='/trenera' element={<Trainer/>} exact/>
                  <Route path='/trainersS' element={<TrainerStories/>} exact/>
              </Routes>
              <ToastContainer />
              <ModalAccounts/>

          </Router>
      </div>
  );
}

export default App;
