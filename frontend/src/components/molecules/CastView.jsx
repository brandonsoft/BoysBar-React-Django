import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';

import { useSelector } from 'react-redux';

import { CastItem } from '../atoms/CastItem';
import styles from './CastView.module.css';

const CastView = (props) => {
    const casts = props.casts;

    return (
        <Container className={styles.container}>
            <Row>
                {
                    casts.map((item, index) => {
                        return (
                            <CastItem key={item.id} info={{name: item.cast_name, image: `http://localhost:8000/media/casts/${item.id}.jpg`}} />
                        )
                    })
                }
            </Row>
        </Container>
    )
}

export default CastView;