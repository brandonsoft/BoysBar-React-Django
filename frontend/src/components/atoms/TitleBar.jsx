import Container from "react-bootstrap/Container"

import styles from './TitleBar.module.css';

const TitleBar = (props) => {
    return (
        <Container fluid className={styles.container}>
            <h4>{props.title}</h4>
        </Container>
    )
}

export default TitleBar;