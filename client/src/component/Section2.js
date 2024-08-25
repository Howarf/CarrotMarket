import styles from "../css/section2.module.css"
import { Link } from 'react-router-dom'

export default function Section_2(){
    const msg = () =>{
        alert("준비중입니다.");
    }
    return(
        <section className={styles.contents}>
            <div>
                <div className={styles.contents_Img}>
                    <img alt="" src='/img/image2.webp'/>
                </div>
                <div className={styles.contentsText}>
                    <h1>우리 동네<br/>중고 직거래 마켓</h1>
                    <p>동네 주민들과 가깝고 따뜻한 거래를 지금 경험해보세요.</p>
                    <div className={styles.contentsBtn}>
                        <Link to={""} onClick={msg} className={styles.btn} id={styles.btn1}>인기매물 보기</Link>
                        <Link to={"/view"} className={styles.btn} id={styles.btn2}>믿을 수 있는 중고거래</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}