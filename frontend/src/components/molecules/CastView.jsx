import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

import { CastItem, CastItemList } from '../atoms/CastItem';
import styles from './CastView.module.css';
import '../../assets/css/pagination.css';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ListAltIcon from '@mui/icons-material/ListAlt';

const CastView = (props) => {
    /* ===== Material UI: [ IconLabelTabs ] =============*/
    const [pagetype, setPagetype] = useState(0);    

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    /* ==================================================*/

    const selectPagetype = (pagetype) => {        
        setPagetype(pagetype);
    }
    
    const casts = props.casts;

    /* ======= React pagination ==================*/
    const itemsPerPage = 12;
    const pageCount = Math.ceil(casts.length / itemsPerPage);
    const [currentPage, setCurrentPage ] = useState(0);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };
    const displayedCasts = casts.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    /* ===========================================*/

    return (
        <Container className={styles.container}>
            <Col xs={12} md={12}>
                <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example" className={'my-3'} centered
                            style={{'border': '1px solid rgb(250 191 47)'}}>
                    <Tab icon={<AddAPhotoIcon />} label="検索結果 サムネイル (TUMBNAILS)" aira-selected="true" 
                            style={{'width': '50%'}} onClick={() => {selectPagetype(0)}}/>
                    <Tab icon={<ListAltIcon />} label="検索結果 リスト (LIST)" xs={12} md={5}
                            style={{'width': '50%'}} onClick={() => {selectPagetype(1)}}/>
                </Tabs>
            </Col>

            <Row>
                {
                    pagetype == 0 &&
                    displayedCasts.map((item, index) => {
                        return (
                            <CastItem key={item.id} cast={item}/>
                        )
                    })
                }
                {
                    pagetype == 1 &&
                    displayedCasts.map((item, index) => {
                        return (
                            <CastItemList key={item.id} cast={item}/>
                        )
                    })
                }
            </Row> 

            <ReactPaginate
                previousLabel='〈'
                nextLabel='〉'
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </Container>
    )
}

export default CastView;