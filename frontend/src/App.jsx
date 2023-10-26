import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Container from "react-bootstrap/Container";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/molecules/header";
import Footer from "./components/molecules/Footer";

import styles from './App.module.css';

const App = () => {
  return (
    <Container fluid className={styles.container}>
      <Header />
      <ToastContainer />
      <div className="container-fluid">
        <Outlet />
      </div>
      <Footer />
    </Container>
  );
};

export default App;
