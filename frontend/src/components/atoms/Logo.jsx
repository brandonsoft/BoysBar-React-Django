import { Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

import styles from './Logo.module.css';

const Logo = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/");
    }

    return (
        <Container fluid className={styles.container}>
            <h1 className={styles.brand} onClick={() => goHome()}>
                ぼいば
            </h1>
        </Container>
    )
}

export default Logo;