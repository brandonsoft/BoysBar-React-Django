import styles from './Input.module.css';

export const SearchBox = (props) => {
    return (
        <input type="text" className={props.theme === 2 ? styles.search_box_2 : styles.search_box} 
                value={props.value} placeholder={props.placeholder} onChange={props.onChange} onKeyUp={props.onKeyUp}/>
    )
}