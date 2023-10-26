import Container from "react-bootstrap/Container";
import { KeywordItem } from "../atoms/Buttons";
import styles from './Keywords.module.css';

import { useDispatch } from "react-redux";

import { removePrefecture, removeFeature } from "../../slices/storesSlice";

export const Keywords = (props) => {
    const prefectures = props.prefectures;
    const features = props.features;

    const dispatch = useDispatch();

    return (
        <Container className={styles.container}>
            {
                prefectures.map((item, index) => {
                    return (
                        <KeywordItem key={index} data={item} onClick={() => dispatch(removePrefecture(item.id))} />
                    )
                })
            }
            {
                features.map((item, index) => {
                    return (
                        <KeywordItem key={index} data={item} onClick={() => dispatch(removeFeature(item.id))} />
                    )
                })
            }
        </Container>
    )
}