import { FaSearch } from "react-icons/fa";
import styles from './Buttons.module.css';

export const SearchButton = (props) => {
    return (
        <button className={styles.search_button} onClick={props.onClick}>
            <FaSearch className={styles.button_icon} />
        </button>
    )
}

export const DockButton = (props) => {
    return (
        <button className={styles.dock_button} onClick={props.onClick}>
            {props.title}
        </button>
    )
}

export const KeywordItem = (props) => {
    return (
        <div className={styles.keyword} onClick={props.onClick}>
            {props.data.value}
        </div>
    )
}