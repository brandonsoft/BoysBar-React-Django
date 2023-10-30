import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Container, Row, Col } from "react-bootstrap";
import { SearchBox } from "../atoms/Input";
import { SearchButton } from "../atoms/Buttons";

import styles from './SearchBar.module.css';
import { fetchCasts, searchCasts } from '../../slices/storesSlice';


import Alert from '@mui/material/Alert';


const SearchBar = (props) => {

    const casts = props.casts;

    const dispatch = useDispatch();
    const [castName, setCastName] = useState('');

    useEffect(() => {
        if(castName === "")
            handleSubmit();
    }, [castName]);
    
    const handleChange = (e) => {
        let str = e.target.value;
        
        setCastName(str);
    }

    const handleEnterMouseDown = (event) => {
        if(event.keyCode === 13){
            handleSubmit();
        }
    }

    const handleSubmit = () => {
        
        let params = new URLSearchParams();

        if(castName !== "" && castName != undefined)
            params.append('cast', castName);

        if(params.toString() === "") {
            dispatch(fetchCasts());
        }
        else {            
            dispatch(searchCasts(params));
        }
    }


    return (
        <Container fluid className={styles.container}>
            <Row className={`${styles.dock_container} w-100`}>
               
                <Col xs={12} sm={12} md={7} className="my-3">
                    <Alert variant="outlined" severity="success">
                        検索結果 {casts.length} 件
                    </Alert>
                </Col>
                <Col xs={12} sm={12} md={5} className={`${styles.input_group} my-3`}>
                    <SearchBox placeholder='キャスト名・店舗名' theme={2} value={castName} className='w-100' 
                                onChange={handleChange} onKeyUp={handleEnterMouseDown}/>
                    <SearchButton onClick={handleSubmit} />
                </Col>
            </Row>
        </Container>
    )
}

export default SearchBar;