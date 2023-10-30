import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FaLine, FaInstagram, FaTwitter, FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa";
import styles from "./Footer.module.css";



const Footer = (props) => {
    const navigate = useNavigate();
    const date = new Date();
    const year = date.getFullYear();

    return (
        <Container fluid className={styles.footer}>
            <Container fluid className={styles.container}>
                <Row className={styles.links_container}>
                    <Col xs={6}>
                        <ul className={styles.links_list}>
                            <li className={styles.links_item} onClick={ () => {window.scrollTo(0,0);} }>トップ</li>
                            <li className={styles.links_item} onClick={ () => navigate('/store') }>ストアリスト</li>
                            <li className={styles.links_item} onClick={ () => navigate('/cast') }>キャストリスト</li>
                            {/* <li className={styles.links_item}>求人</li> */}
                        </ul>
                    </Col>
                    <Col xs={6}>
                        <ul className={styles.image_list}>
                            <li className={styles.image_item}>
                                <img src="http://localhost:8000/media/bars/bar1-0.jpg"/>
                            </li>
                            <li className={styles.image_item} onClick={ () => navigate('/store') }>
                                <img src="http://localhost:8000/media/bars/bar2-0.jpg" />
                            </li>
                            <li className={styles.image_item} onClick={ () => navigate('/cast') }>
                                <img src="http://localhost:8000/media/casts/1.jpg" />
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ul className={styles.social_list}>
                            <li className={styles.social_item}>
                                <FaLine />
                            </li>
                            <li className={styles.social_item}>
                                <FaInstagram />
                            </li>
                            <li className={styles.social_item}>
                                <FaTwitter />
                            </li>
                            <li className={styles.social_item}>
                                <FaFacebook />
                            </li>
                            <li className={styles.social_item}>
                                <FaTiktok />
                            </li>
                            <li className={styles.social_item}>
                                <FaYoutube />
                            </li>
                        </ul>
                        <h5 className={styles.copyright}>
                            Copyright &copy; {year} All right reserved
                        </h5>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
};

export default Footer;
