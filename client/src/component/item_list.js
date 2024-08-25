import styles from "../css/itemList.module.css";
import Card from "../component/Card";
import axios from "axios";
import { useNavigate,Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Item_list(){
    const navigate = useNavigate();
    const [postData, setPostData] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get('/post/listLoad').then(res =>{
            setPostData(res.data);
        }
        ).catch()
    }, [])
    const uploadPage = () => {
        if(sessionStorage.getItem("user_info")){
            navigate("/upload");
        }
        else{
            if(window.confirm('로그인이 필요한 작업입니다. 로그인 하시겠습니까?')){
                navigate("/account");
            }
        }
    }
    const cardRander = postData.map((el) =>{
        const num = el.post_num;
        return(
            <Card data = {el} key={num}/>
        )
    })
    
    return(
        <div className={styles.content}>
            <h1 className={styles.title}>중고거래 매물</h1>
            <div className={styles.subNav}>
                <button id={styles.uploadBtn} onClick={uploadPage}><img alt="" src="/img/logo2.png"/><p>올리기</p></button>
            </div>
            <div className={styles.cardList}>
                {cardRander}
            </div>
            <Outlet/>
        </div>
    )
}