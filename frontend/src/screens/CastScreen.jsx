import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Container } from "react-bootstrap";

import CastView from "../components/molecules/CastView";
import SearchBar from "../components/molecules/SearchBar";
import { fetchCasts } from '../slices/storesSlice';

const styles = {
    backgroundColor: '#ffffff',
    minHeight: 500,
    margin: '0 !important'
}

const CastScreen = () => {
    const dispatch = useDispatch();
    const casts = useSelector(state => state.stores.casts);

    useEffect(() => {
        dispatch(fetchCasts());
    }, [dispatch]);

    return (
        <Container fluid style={styles}>
            <SearchBar casts={casts} />
            <CastView casts={casts} />
        </Container>
    )
}

export default CastScreen;