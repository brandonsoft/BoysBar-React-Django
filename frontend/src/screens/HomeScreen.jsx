import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container';

import Logo from '../components/atoms/Logo';
import Dock from '../components/molecules/Dock';
import StoreViewHome from '../components/molecules/StoreViewHome';

import { fetchSuggestStore, fetchCasts } from '../slices/storesSlice';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const storeList = useSelector((state) => state.stores.stores);
    const casts = useSelector(state => state.stores.casts);

    const prefectures = useSelector(state => state.stores.prefectures);
    const features = useSelector(state => state.stores.features);


    useEffect(() => {
        dispatch(fetchSuggestStore());
        dispatch(fetchCasts());
    }, [dispatch]);

    const [pagetype, setPagetype] = useState(0);
    
    const updateParentState = (newPagetype) => {
        setPagetype(newPagetype);
    }

    return (
        <Container fluid>
            <Logo />
            <Dock redirect='/store' prefectures={prefectures} features={features} updateParentState={updateParentState}/>
            <StoreViewHome stores={storeList} casts={casts} pagetype={pagetype} updateParentState={updateParentState}/>
        </Container>
    )
}

export default HomeScreen;