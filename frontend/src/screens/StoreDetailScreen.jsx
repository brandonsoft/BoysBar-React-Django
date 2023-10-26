import { Container } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSuggestStore } from "../slices/storesSlice";

import StoreView from "../components/molecules/StoreView";

const styles = {
    backgroundColor: '#ffffff',
    minHeight: 500,
    margin: '0 !important'
}

const StoreDetailScreen = () => {
    const dispatch = useDispatch();
    const storeList = useSelector((state) => state.stores.stores);

    useEffect(() => {
        dispatch(fetchSuggestStore());
    }, [dispatch]);

    return (
        <Container fluid style={styles}>
            <StoreView stores={storeList} />
        </Container>
    )
}

export default StoreDetailScreen;