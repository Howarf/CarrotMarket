import styles from "../css/section3.module.css"
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import Card from "../component/Card";
import axios from "axios";

export default function Section_bottom(){
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        axios.get('/post/popular').then(res =>{
            setPostData(res.data);
        }).catch()
    }, [])

    const cardRander = postData.map((el) =>{
        const num = el.post_num;
        return(
            <Card data = {el} key={num}/>
        )
    })

    return(
        <section className={styles.contents}>
            <div>
                <h1 id={styles.hotTitle}>중고거래 인기매물</h1>
                <div className={styles.cardList}>
                    {cardRander}
                </div>
                <div id={styles.moreList}>
                    <Link to={"/view"}>매물 더 보기</Link>
                </div>
            </div>
        </section>
    )
}