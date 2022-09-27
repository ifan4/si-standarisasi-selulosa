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

export default function App(props) {

    // TEST
  useEffect(()=>{
    document.title = "Standarisasi Selulosa"
  },[])
  

  return(
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/detailData" element={<DetailData/>}/>

      <Route path="/admin">
        <Route index element={<DashboardAdmin/>}/>
        <Route path="dataStandar">
          <Route index element={<DataStandar/>}/>
          <Route path="add" element={<AddDataStandar/>}/>
        </Route>
        <Route path="usersManagement">
          <Route index element={<UsersManagement/>}/>
          <Route path="add" element={<AddUsers/>}/>
        </Route>
      </Route>

      <Route path="/authentication">
        <Route path="login" element={<LoginPage/>}/>
      </Route>
    </Routes>
  )
}