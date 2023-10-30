import React, { useEffect, useState } from "react";

import ReactPaginate from "react-paginate";

import { Container, Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";

import { StoreItem, StoreItemList, StoreItemDetail } from "../atoms/StoreItem";
import styles from "./StoreView.module.css";
import "../../assets/css/pagination.css";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Alert from "@mui/material/Alert";
import store from "../../store";

const StoreView = (props) => {
    /* ===== Material UI: [ IconLabelTabs ] =============*/
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    /* ==================================================*/

    const stores = props.stores;

    /* ======= React pagination ==================*/
    const itemsPerPage = 12;
    const pageCount = Math.ceil(stores.length / itemsPerPage);

    // currentPage => 0,1, 2, 3, ...
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };
    
    const displayedStores = stores.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );
    /* ===========================================*/

    const casts = props.casts;

    // currentPage => 0: [StoreItem], 1: [StoreItemList], 2: [StoreItemDetail]
    const [pagetype, setPagetype] = useState(props.pagetype);

    const [currentStore, setCurrentStore] = useState({});
    const [currentStoreCasts, setCurrentStoreCasts] = useState([]);

    const selectPagetype = (pagetype, store_id = null) => {
        setPagetype(pagetype);

        if (store_id != null) {
        const result = stores.find((store) => store.id == store_id);
        setCurrentStore(result);
        }

        props.updateParentState(pagetype);
    };

    const matchStore = async (search) => {
        const result = await casts.find((cast) => cast.bar_ids.includes(search));
        return result;
    }

    useEffect(() => {
        console.log("=== search start === ");
        const search = "," + currentStore.id + ",";
        console.log("=== search = " + search);

        const fetchData = async (search) => {
            
            const resultCasts = await matchStore(search);
            setCurrentStoreCasts(resultCasts);
        };

        fetchData(search);
    }, []);

    console.log('===currentStore===');
    console.log(currentStore);
    //   console.log('===casts===');
    //   console.log(casts);
    //   console.log('===currentStoreCasts===');
    //   console.log(currentStoreCasts);

    return (
        <Container fluid className={styles.container}>
        <Col xs={12} sm={12} md={12} className="my-3">
            <Alert variant="outlined" severity="success">
            検索結果 {stores.length} 件
            </Alert>
        </Col>
        <Col xs={12} md={12}>
            <Tabs
            value={value}
            onChange={handleChange}
            aria-label="icon label tabs example"
            className={"my-3"}
            centered
            style={{ border: "1px solid rgb(250 191 47)" }}
            >
            <Tab
                icon={<AddAPhotoIcon />}
                label="検索結果 サムネイル (TUMBNAILS)"
                aira-selected="true"
                style={{ width: "50%" }}
                onClick={() => {
                selectPagetype(0);
                }}
            />
            <Tab
                icon={<ListAltIcon />}
                label="検索結果 リスト (LIST)"
                xs={12}
                md={5}
                style={{ width: "50%" }}
                onClick={() => {
                selectPagetype(1);
                }}
            />
            </Tabs>
        </Col>
        <Row>
            {pagetype == 0 &&
            displayedStores.map((item, index) => {
                return (
                <StoreItem
                    key={item.id}
                    store={item}
                    selectPagetype={selectPagetype}
                />
                );
            })}
            {pagetype == 1 &&
            displayedStores.map((item, index) => {
                return (
                <StoreItemList
                    key={item.id}
                    store={item}
                    casts={casts}
                    selectPagetype={selectPagetype}
                />
                );
            })}
            
        </Row>
        
        <ReactPaginate
            previousLabel="〈"
            nextLabel="〉"
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}/>
        
        </Container>
    );
    };

    export default StoreView;
