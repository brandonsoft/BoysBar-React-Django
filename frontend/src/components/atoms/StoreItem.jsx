import Col from 'react-bootstrap/Col';
import styles from './StoreItem.module.css';

export const StoreItem = (props) => {

    return (
        <Col sm={6} md={4} className={styles.container}>
            <img src={props.info.image} alt="Card image cap" />
            <div className={styles.title_bar}>
                <h5>{props.info.name}</h5>
            </div>
        </Col>
    )
}
