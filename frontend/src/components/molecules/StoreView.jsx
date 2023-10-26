import { useNavigate } from "react-router-dom";

import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';

import { StoreItem } from '../atoms/StoreItem';
import styles from './StoreView.module.css';

const StoreView = (props) => {
    const stores = props.stores;
    const navigate = useNavigate();

    return (
        <Container fluid className={styles.container}>
            <Row>
                {
                    stores.map((item, index) => {
                        return (
                            <StoreItem key={item.id} 
                                    info={{name: item.bar_title, image: `http://localhost:8000/media/bars/bar${item.id}.jpg`}} 
                                    onclick={() => {}}/>
                        )
                    })
                }
            </Row>
        </Container>
    )
}

export default StoreView;