import Col from 'react-bootstrap/Col';
import styles from './CastItem.module.css';

import { backendPath } from '../../config.js';

export const CastItem = (props) => {

    const cast = props.cast;

    return (
        <Col sm={3} md={3} lg={2} className={styles.container}>
            <img src={`${backendPath}media/casts/${cast.id}.jpg`} alt="Cast image"/>
            <div className={styles.title_bar}>
                <h5>{cast.cast_name}</h5>
            </div>
        </Col>
    )
}


export const CastItemList = (props) => {

    const cast = props.cast;

    return (
        <Col sm={12} md={12} className={styles.cast_detail_container + ' row '}>
            <Col xs={12} md={2} className={styles.cast_photo_div}>
                <img src={`${backendPath}media/casts/${cast.id}.jpg`} className={styles.cast_photo}></img>
            </Col>
            <Col xs={12} md={10} className={styles.cast_detail}>
                <Col xs={12} md={12} className={styles.cast_name}>
                    <h5 style={{'fontWeight': 'bold'}}>{cast.cast_name}</h5>
                </Col>
                <Col xs={12} md={12} className='row'> 
                    <Col xs={5} md={2}>
                        <label className={styles.field_label}>誕生日</label>
                    </Col>
                    <Col xs={7} md={2}>
                        <span className={styles.field_value}>{cast.cast_birthday}</span>
                    </Col>
                    <Col xs={5} md={2}>
                        <label className={styles.field_label}>血液型</label>
                    </Col>
                    <Col xs={7} md={6}>
                        <span className={styles.field_value}>
                            {cast.cast_blood ==0 && 'O'}
                            {cast.cast_blood ==1 && 'A'}
                            {cast.cast_blood ==2 && 'B'}
                            {cast.cast_blood ==3 && 'C'}型</span>
                    </Col>
                    <Col xs={5} md={2}>
                        <label className={styles.field_label}>身長</label>
                    </Col>
                    <Col xs={7} md={2}>
                        <span className={styles.field_value}>{cast.cast_height}cm</span>
                    </Col>
                    
                    <Col xs={5} md={2}>
                        <label className={styles.field_label}>星座</label>
                    </Col>
                    <Col xs={7} md={6}>
                        <span className={styles.field_value}>{cast.cast_horoscope}</span>
                    </Col>
                    <Col xs={5} md={2}>
                        <label className={styles.field_s_label}>はじめに</label>
                    </Col>
                    <Col xs={12} md={6}>
                        <span className={styles.field_value}>{cast.cast_description}</span>
                    </Col>
                    
                </Col>
            </Col>            
        </Col>
    )
}
