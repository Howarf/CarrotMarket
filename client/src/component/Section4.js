import styles from "../css/section4.module.css"
import { Link } from 'react-router-dom'

export default function Section_bottom(){
    return(
        <section className={styles.contents}>
            <h3>
                <Link to={""} className={styles.hotSearch}>중고거래 인기검색어</Link>
            </h3>
            <ul id={styles.searchList}>
                <li><Link to={""} className={styles.searchItem}>자전거</Link></li>
                <li><Link to={""} className={styles.searchItem}>의자</Link></li>
                <li><Link to={""} className={styles.searchItem}>아이폰</Link></li>
                <li><Link to={""} className={styles.searchItem}>냉장고</Link></li>
                <li><Link to={""} className={styles.searchItem}>노트북</Link></li>
                <li><Link to={""} className={styles.searchItem}>패딩</Link></li>
                <li><Link to={""} className={styles.searchItem}>아이패드</Link></li>
                <li><Link to={""} className={styles.searchItem}>모니터</Link></li>
                <li><Link to={""} className={styles.searchItem}>스타벅스</Link></li>
                <li><Link to={""} className={styles.searchItem}>책상</Link></li>
            </ul>
        </section>
    )
}