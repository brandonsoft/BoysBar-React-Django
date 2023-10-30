import React, { useEffect, useState } from 'react';

import ReactPaginate from 'react-paginate';

import { Container, Col } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';

import { StoreItem, StoreItemList, StoreItemDetail } from '../atoms/StoreItem';
import styles from './StoreView.module.css';
import '../../assets/css/pagination.css';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Alert from '@mui/material/Alert';


const StoreDetailView = (props) => {
    
    const stores = props.stores;
    
    const casts = props.casts;
    
    // currentPage => 0: [StoreItem], 1: [StoreItemList], 2: [StoreItemDetail]
    const [pagetype, setPagetype] = useState(props.pagetype);    

    const [currentStore, setCurrentStore] = useState({});
    const [currentStoreCasts, setCurrentStoreCasts] = useState([]);

    const selectPagetype = (pagetype, store_id = null) => {
        
        setPagetype(pagetype);
        
        if(store_id != null){
            setCurrentStore(stores.find(store => store.id === store_id));
        }

        props.updateParentState(pagetype);
    }

    useEffect(() => {
        const fetchData = async() => {
            let search = "," + currentStore.id + ",";
            setCurrentStoreCasts(casts.find(cast => cast.bar_ids.includes(search)));
        }              
        
        fetchData();
    }, [currentStore, casts])
    

    return (
        <Container fluid className={styles.container}>
            <Col xs={12} sm={12} md={12} className="my-3">
                <Alert variant="outlined" severity="success">
                    検索結果 {stores.length} 件 
                </Alert>
            </Col>
            
            <Row>
                
                <StoreItemDetail key={currentStore.id} store={currentStore} casts={currentStoreCasts}/>
            </Row>
            
        </Container>
    )
}

export default StoreDetailView;