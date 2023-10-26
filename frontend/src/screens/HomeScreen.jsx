import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container';

import Logo from '../components/atoms/Logo';
import Dock from '../components/molecules/Dock';
import StoreView from '../components/molecules/StoreView';

import { fetchSuggestStore } from '../slices/storesSlice';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const storeList = useSelector((state) => state.stores.stores);
    const prefectures = useSelector(state => state.stores.prefectures);
    const features = useSelector(state => state.stores.features);


    useEffect(() => {
        dispatch(fetchSuggestStore());
    }, [dispatch]);

    return (
        <Container fluid>
            <Logo />
            <Dock redirect='/store' prefectures={prefectures} features={features} />
            <StoreView stores={storeList} />
        </Container>
    )
}

export default HomeScreen;