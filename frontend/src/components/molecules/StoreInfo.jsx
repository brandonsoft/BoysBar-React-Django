import MainContainer from "../atoms/MainContainer";

import TitleBar from "../atoms/TitleBar";

const StoreInfo = (props) => {

    return(
        <MainContainer>
            <img src={props.image_url} className={styles.image} />
        </MainContainer>
    )
}