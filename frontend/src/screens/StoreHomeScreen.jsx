import { Container } from "react-bootstrap";
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSuggestStore, fetchCasts } from "../slices/storesSlice";

import Dock from '../components/molecules/Dock';
import StoreView from "../components/molecules/StoreView";

const styles = {
    backgroundColor: '#ffffff',
    minHeight: 500,
    margin: '0 !important'
}

const StoreScreen = () => {
    const dispatch = useDispatch();

    const storeList = useSelector((state) => state.stores.stores);
    const casts = useSelector(state => state.stores.casts);
    
    useEffect(() => {
        setPagetype(pagetype);
    }, [pagetype])

    useEffect(() => {
        dispatch(fetchSuggestStore());
        dispatch(fetchCasts());
    }, [dispatch]);


    return (
        <Container fluid style={styles}>
            <Dock pagetype={pagetype} updateParentState={updateParentState}/>
            <StoreView stores={storeList} casts={casts} pagetype={pagetype} updateParentState={updateParentState}/>
        </Container>
    )
}

export default StoreScreen;