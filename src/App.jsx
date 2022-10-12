import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import DashboardAdmin from './pages/admin/dashboard'
import DataStandar from "./pages/admin/dataStandar";
import UsersManagement from "./pages/admin/usersManagement";
import AddDataStandar from './pages/admin/dataStandar/addData'
import AddUsers from "./pages/admin/usersManagement/addUser";
import Home from "./pages/home";
import LoginPage from "./pages/authenication/login";
import DetailData from "./pages/home/detailData";
import Validator from './pages/validator'
import DataValidateRequest from './pages/validator/dataValidate'
import EditDataStandar from './pages/admin/dataStandar/editData'
import Profile from './pages/authenication/profile'
import EditUser from './pages/admin/usersManagement/editUser'
import DataByCategory from "./pages/home/dataByCategory";
import HelpManagement from './pages/admin/helpManagement'


export default function App(props) {

    // TEST
  useEffect(()=>{
    document.title = "Standarisasi Selulosa"
  },[])
  

  return(
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/dataStandar" element={<DataByCategory/>}/>
      <Route path="/detailData" element={<DetailData/>}/>

      <Route path="/admin">
        <Route index element={<DashboardAdmin/>}/>
        <Route path="dataStandar">
          <Route index element={<DataStandar/>}/>
          <Route path="add" element={<AddDataStandar/>}/>
          <Route path="edit" element={<EditDataStandar/>} />
        </Route>
        <Route path="usersManagement">
          <Route index element={<UsersManagement/>}/>
          <Route path="add" element={<AddUsers/>}/>
          <Route path="edit" element={<EditUser/>}/>
        </Route>
        <Route path="helpManagement">
          <Route index element={<HelpManagement/>} />
        </Route>
      </Route>

      <Route path="/validator">
        <Route index element={<Validator/>}/>
        <Route path="dataValidate-request" element={<DataValidateRequest/>} />
      </Route>
      <Route path="/authentication">
        <Route path="login" element={<LoginPage/>}/>
      </Route>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
  )
}