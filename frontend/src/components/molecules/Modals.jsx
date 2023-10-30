import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { FaSearch } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';
import styles from "./Modals.module.css"

import { useDispatch, useSelector } from 'react-redux';
import { updatePrefectures, updateFeatures } from '../../slices/storesSlice';

import axios from 'axios';
import { backendPath } from '../../config.js';

export const SelectPrefectureDialog = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const prefectures = useSelector(state => state.stores.prefectures);

    const [prefecture_list, setPrefecture_list] = useState([]);
    const [currentPrefectures, setCurrentPrefectures] = useState(prefectures);
    const [filter, setFilter] = useState([]);
    
    const fetchPrefecturelist = async() => {
        let prefecturelist = [];

        let response = await axios.get(`${backendPath}province/all_area_province`);                
        if(response.status === 200) {
            prefecturelist = response.data;
            
        } else {
            console.log(" ===== response ===== failure ");                
        }           

        return prefecturelist;
    }
    
    useEffect(() => {
        const fetchData = async () => {
            let result = await fetchPrefecturelist();
            setPrefecture_list(result);
        }
        fetchData();
    }, [prefectures]);

    useEffect(() => {
        setCurrentPrefectures(prefectures);
    }, [prefectures]);

    useEffect(() => {
        // console.log('=== inspect prefecture_list =');
        // console.log(prefecture_list);

        // console.log('=== inspect currentPrefectures =');
        // console.log(currentPrefectures);

        let temp = [];
        let len = prefecture_list.length;
        let len_2 = currentPrefectures.length;

        for (let i = 0; i < len; i++) {
            temp[i] = false;

            for (let j = 0; j < len_2; j++) {
                if (currentPrefectures[j].id === prefecture_list[i].id) {
                    temp[i] = true;
                    break;
                }
            }
        }
        setFilter(temp);

    }, [currentPrefectures, prefecture_list]);

    const handlePrefecture = (e, index) => {
        let checked = e.target.checked;
        let temp = [];

        if (checked) {
            temp = Object.assign(temp, currentPrefectures);
            temp.push(prefecture_list[index]);
        }
        else {
            temp = prefectures.filter((item) => item.id !== prefecture_list[index].id);
        }

        setCurrentPrefectures(temp);

        let t_filter = filter;
        t_filter[index] = checked;
        setFilter(t_filter);
    }

    const onClose = () => {
        dispatch(updatePrefectures(currentPrefectures)); 

        let url = props.redirect;

        if(props.redirect !== undefined && props.redirect !== "")
            navigate(url);
        
        props.onHide();
    }

    return (
        <Modal {...props} aria-labelledby="select-prefecture-modal">
            <Modal.Header closeButton>
                <Modal.Title id='select-prefecture-modal' className={styles.modal_title}>
                    エリア絞り込み
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <div className={`row ${styles.modal_container}`}>
                        {
                            prefecture_list.map((value, index) =>
                                value.category == 0 ? (
                                    <div key={index} className={`col-12 ${styles.category}`} >
                                        {value.value}
                                    </div>
                                ) :
                                (
                                    <div key={index} className={`col-6 col-md-4 ${styles.category_item}`}>
                                        {
                                            filter[index] ? (
                                                <input className={`form-check-input ${styles.checkbox}`} type="checkbox" defaultChecked 
                                                        onClick={(e) => handlePrefecture(e, index)} />
                                            ) :
                                            (
                                                <input className={`form-check-input ${styles.checkbox}`} type="checkbox" 
                                                    onClick={(e) => handlePrefecture(e, index)} />
                                            )
                                        }
                                        <label className={`form-check-label ${styles.label}`}>{value.value}</label>
                                    </div>
                                ))
                        }
                    </div>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => onClose()} className='w-100 p-2'>このエリアで絞り込む</Button>
            </Modal.Footer>
        </Modal>
    );
}

export const SelectFilterDialog = (props) => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const features = useSelector(state => state.stores.features);
    
    const [feature_list, setFeature_list] = useState([]);
    const [currentFeatures, setCurrentFeatures] = useState(features);
    const [filter, setFilter] = useState([]);

    const fetchFeaturelist = async () => {
        let featurelist = [];

        let response = await axios.get(`${backendPath}bars/all_features`)
        if(response.status == 200){
            featurelist = response.data;
        }  else {
            console.log(" ===== response ===== failure ");                
        } 

        return featurelist;
    }

    useEffect(() => {
        const fetchData = async () => {            
            let result = await fetchFeaturelist();
            setFeature_list(result);
        }
        
        fetchData();
    }, [features]);

    useEffect(() => {
        setCurrentFeatures(features);
    }, [features]);

    useEffect(() => {
        let len = feature_list.length;
        let len_2 = currentFeatures.length;
        let temp = [];

        for(let i = 0; i < len; i++) {
            temp[i] = false;

            for (let j = 0; j < len_2; j++) {
                if(currentFeatures[j].id === feature_list[i].id) {
                    temp[i] = true;
                    break;
                }
            }
        }

        setFilter(temp);

    }, [currentFeatures, feature_list]);

    const handleFeature = (e, index) => {
        let checked = e.target.checked;
        let temp = [];

        if(checked) {
            temp = Object.assign(temp, currentFeatures);
            temp.push(feature_list[index]);
        }
        else {
            temp = features.filter((item) => item.id !== feature_list[index].id);
        }
        
        setCurrentFeatures(temp);
        
        let t_filter = filter;
        t_filter[index] = checked;
        setFilter(t_filter);
    }

    const onClose = () => {
        dispatch(updateFeatures(currentFeatures));

        let url = props.redirect;

        if(props.redirect !== undefined && props.redirect !== "")
            navigate(url);
        
        props.onHide();
    }

    return (
        <Modal {...props} aria-labelledby="select-feature-modal" centered>
            <Modal.Header closeButton id='select-feature-modal'>
                <Modal.Title id='select-feature-modal' className={styles.modal_title}>
                    条件絞り込み
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <div className={`row ${styles.modal_container}`}>
                        {
                            feature_list.map((value, index) =>
                                value.category == 0 ? (
                                    <div key={index} className={`col-12 ${styles.category}`} >
                                        {value.value}
                                    </div>
                                ) :
                                (
                                    <div key={index} className={`col-12 col-lg-4 ${styles.category_item}`}>
                                        {
                                            filter[index] ? (
                                                <input className={`form-check-input ${styles.checkbox}`} defaultChecked type="checkbox" 
                                                        onClick={(e) => handleFeature(e, index)} />
                                            ) : 
                                            (
                                                <input className={`form-check-input ${styles.checkbox}`} type="checkbox" 
                                                        onClick={(e) => handleFeature(e, index)} />
                                            )
                                        }
                                        <label className={`form-check-label ${styles.label}`}>{value.value}</label>
                                    </div>
                                ))
                        }
                    </div>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={ () => onClose() } className='w-100 p-2'>この条件で絞り込む</Button>
            </Modal.Footer>
        </Modal>
    );
}

export const SearchDialog = (props) => {
    const [store, setStore] = useState('');
    const [cast, setCast] = useState('');

    return (
        <Modal {...props} aria-labelledby="search-modal" top>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>店舗検索</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control type="text" name='store' value={store} placeholder="" />
                            <Button variant="outline-secondary" id="button-addon2">
                                <FaSearch />
                            </Button>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>キャスト検索</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control type="text" name='cast' value={cast} placeholder="" />
                            <Button variant="outline-secondary" id="button-addon2">
                                <FaSearch />
                            </Button>
                        </InputGroup>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
}