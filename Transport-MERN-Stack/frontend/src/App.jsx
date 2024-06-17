import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import CreateTransports from './pages/CreateTransports';
import DeleteTransport from './pages/DeleteTransport';
import EditTrasnport from './pages/EditTrasnport';
import ShowTransport from './pages/ShowTransport';
import VehicleHome from './pages/VehicleHome';
import CreateVehicles from './pages/CreateVehicle';
import ShowVehicle from './pages/showVehicles';
import EditVehicle from './pages/EditVehicle';
import DeleteVehicle from './pages/DeleteVehicles';
import TransportFinancial from './pages/TransportFinancial';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/transports/create' element={<CreateTransports/>} />
      <Route path='/transports/details/:id' element={<ShowTransport/>} />
      <Route path='/transports/edit/:id' element={<EditTrasnport/>} />
      <Route path='/transports/delete/:id' element={<DeleteTransport/>} />
      <Route path='/financial' element={<TransportFinancial/>}/>

      <Route path='/vehicles' element={<VehicleHome/>} />
      <Route path='/vehicles/create' element={<CreateVehicles/>} />
      <Route path='/vehicles/details/:id' element={<ShowVehicle/>} />
      <Route path='/vehicles/edit/:id' element={<EditVehicle/>} />
      <Route path='/vehicles/delete/:id' element={<DeleteVehicle/>} />

    </Routes>
  )
}

export default App
