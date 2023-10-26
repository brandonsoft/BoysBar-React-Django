import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Container } from "react-bootstrap";

import CastView from "../components/molecules/CastView";
import SearchBar from "../components/molecules/SearchBar";
import { fetchCast } from "../slices/storesSlice";

const styles = {
    backgroundColor: '#ffffff',
    minHeight: 500,
    margin: '0 !important'
}

const CastDetailScreen = () => {
    // const cast = useSelector(state => state.stores.casts);
    const cast = {};
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCast());
    }, [dispatch]);

    return (
        <Container fluid style={styles}>
            <SearchBar casts={cast} />
            <CastView casts={cast} />
        </Container>
    )
}

export default CastDetailScreen;