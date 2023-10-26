import { useState } from "react";
import { Navbar, Nav, Container, NavItem } from "react-bootstrap";
import { FaSearch, FaBars } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import { Offcanvas } from "react-bootstrap";

import { SearchDialog } from "./Modals";

import styles from './Header.module.css';

const Header = () => {
    const [searchShow, setSearchShow] = useState(false);
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    const addStoreHandler = () => {
        if (userInfo) navigate("/store");
        else navigate("/login");
    };

    return (
        <>
            <Navbar expand="md" className={`bg-body-tertiary ${styles.navbar}`}>
                <Container fluid className={styles.container}>
                    <Navbar.Toggle aria-controls='offcanvasNavbar-expand-md' className={styles.toggle} >
                        <FaBars style={{ color: "#ffffff" }} />
                    </Navbar.Toggle>
                    <Navbar.Brand className={styles.brand} onClick={() => navigate('/')}>
                        <img src="../../../public/images/brand.svg" />
                    </Navbar.Brand>
                    <div className={styles.search} onClick={() => setSearchShow(!searchShow)}>
                        <FaSearch />
                    </div>
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-md`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                        placement="start" className={styles.offcanvas}
                    >
                        <Offcanvas.Header closeButton></Offcanvas.Header>
                        <Offcanvas.Body className='p-0'>
                            <Nav className="justify-content-start flex-grow-1">
                                <NavItem onClick={() => navigate('/store')} className={styles.nav_link}>ストアリスト</NavItem>
                                <NavItem onClick={() => navigate('/cast')} className={styles.nav_link}>キャストリスト</NavItem>
                            </Nav>
                            {userInfo ? (
                                <Nav className="justify-content-end flex-grow-1">
                                    <NavItem onClick={logoutHandler} className={styles.nav_item}>ログアウト</NavItem>
                                </Nav>
                            ) : (
                                <Nav className="justify-content-end flex-grow-1">
                                    <Nav.Link href="/login" className={styles.nav_link}>ログイン</Nav.Link>
                                    <Nav.Link href="/register" className={styles.nav_link}>新規登録</Nav.Link>
                                </Nav>
                            )}
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            <SearchDialog show={searchShow} scrollable={true} onHide={() => setSearchShow(false)} />
        </>
    );
};

export default Header;
