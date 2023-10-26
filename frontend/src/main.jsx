import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store.js';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
// import ProfileScreen from './screens/ProfileScreen.jsx';
// import PrivateRoute from './components/PrivateRoute.jsx';
import StoreScreen from './screens/StoreScreen.jsx';
import CastScreen from './screens/CastScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/store' element={<StoreScreen />} />
      <Route path='/cast' element={<CastScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      {/* <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
      </Route> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
