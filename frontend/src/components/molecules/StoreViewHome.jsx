import React, { useState } from 'react';

import { Container, Col } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';

import { StoreItemHome, StoreItemList, StoreItemDetail } from '../atoms/StoreItem';
import styles from './StoreView.module.css';
import '../../assets/css/pagination.css';

const StoreViewHome = (props) => {

    /* ===== Material UI: [ IconLabelTabs ] =============*/
    const [pagetype, setPagetype] = useState(props.pagetype);    

    const [currentStore, setCurrentStore] = useState({});
    const [currentStoreCasts, setCurrentStoreCasts] = useState([]);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    /* ==================================================*/

    const stores = props.stores;
    /* ======= React pagination ==================*/
    const itemsPerPage = 12;
    const pageCount = Math.ceil(stores.length / itemsPerPage);
    const [currentPage, setCurrentPage ] = useState(0);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };
    const displayedStores = stores.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    /* ===========================================*/

    const casts = props.casts;
    
    const selectPagetype = (pagetype, store_id = null) => {
        
        setPagetype(pagetype);
        if(store_id != null){
            setCurrentStore(stores.find(store => store.id === store_id));
        }
        props.updateParentState(pagetype);
    }

    return (
        <Container fluid className={styles.container}>
                
            <Col xs={12} sm={12} md={12} className="my-3">
                検索結果 {stores.length} 件 
            </Col>
            <Row>
                {
                    pagetype == 0 && 
                    displayedStores.map((item, index) => {
                        return (
                            <StoreItemHome key={item.id} 
                                    info={{name: item.bar_title, image: `http://localhost:8000/media/bars/bar${item.id}-0.jpg`}} 
                                    store={item} casts={casts}/>
                        )
                    })
                }
                {
                    pagetype == 1 && 
                    displayedStores.map((item, index) => {
                        return (
                            <StoreItemList key={item.id} store={item} casts={casts} selectPagetype={selectPagetype}/>
                        )
                    })
                }
            </Row>
        </Container>
    )
}

export default StoreViewHome;