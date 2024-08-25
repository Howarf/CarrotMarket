import styles from "../css/section1.module.css"

export default function Section1(){
    return(
        <section className={styles.contents}>
            <div>
                <div className={styles.contentsText}>
                    <h1>당신 근처의<br/>당근마켓</h1>
                    <p>중고 거래부터 동네 정보까지, 이웃과 함께해요.<br/>가깝고 따뜻한 당신의 근처를 만들어요.</p>
                </div>
                <div className={styles.contentsImg}>
                    <img alt="" src='/img/image1.webp'/>
                </div>
            </div>
        </section>
    )
}