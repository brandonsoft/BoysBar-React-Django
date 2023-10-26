import Col from 'react-bootstrap/Col';
import styles from './CastItem.module.css';

export const CastItem = (props) => {
    return (
        <Col sm={3} md={3} lg={2} className={styles.container}>
            <img src={props.info.image} alt="Cast image" />
            <div className={styles.title_bar}>
                <h5>{props.info.name}</h5>
            </div>
        </Col>
    )
}
