import { Container } from "react-bootstrap";
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { fetchSuggestStore, fetchCasts } from "../slices/storesSlice";

import { StoreItemDetail } from '../components/atoms/StoreItem';

const styles = {
    backgroundColor: '#ffffff',
    minHeight: 500,
    margin: '0 !important'
}

const StoreDetailScreen = () => {

    const dispatch = useDispatch();
    
    const storeList = useSelector((state) => state.stores.stores);
    const casts = useSelector(state => state.stores.casts);
    
    const storeId = useSelector(state => state.stores.detail_storeid);

    

    const [currentStore, setCurrentStore] = useState({});
    const [currentStoreCasts, setCurrentStoreCasts] = useState([]);

    const navigate = useNavigate();

    if(storeId == 0) {
        navigate('/store');
    }
    
    useEffect(() => {
        dispatch(fetchSuggestStore());
        dispatch(fetchCasts());
    }, [dispatch]);

    useEffect(() => {
        setCurrentStore(storeList.find(store => store.id === storeId))

        const search = "," + storeId + ",";
        const fetchData = async(search) => {
            const result = await casts.filter(cast => cast.bar_ids.includes(search));
            setCurrentStoreCasts(result);
        }              
        

        fetchData(search);
    }, [storeId])

    return (
        <Container fluid style={styles}>
            <StoreItemDetail store={currentStore} casts={currentStoreCasts}/>
        </Container>
    )
}

export default StoreDetailScreen;