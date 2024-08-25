import styles from "../css/item.module.css"
import Card from "./Card"
import { Link, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Detail(){
    const params = useParams();
    const slideRef = useRef(null);
    const [currentImgOrder, setCurrentImgOrder] = useState(0);
    const IMG_WIDTH = 678;
    const [IMG_PAGE, setImgPage] = useState(0);
    const slideRange = currentImgOrder * IMG_WIDTH;
    const static_url = "http://localhost:3000/public/img/";
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [price, setPrice] = useState(0);
    const [img_url, setImg_url] = useState([]);
    const [view, setView] = useState(0);
    const [postData, setPostData] = useState([]);

    useEffect(()=>{
        axios.post('/post/detail',null,{params:{'num': params.id}
        }).then((res)=>{
            let imgs = res.data.img_url.split(',');
            imgs.pop();
            setName(res.data.u_name);
            setTitle(res.data.title);
            setPrice(res.data.price);
            setText(res.data.data.replaceAll("<br>", "\r\n"));
            setImg_url(imgs);
            setView(res.data.view);
            setImgPage(imgs.length);
        }).catch();

        axios.get('/post/examList').then(res =>{
            setPostData(res.data);
        }
        ).catch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[params])

    useEffect(()=>{
        slideRef.current.style.transition = "all 0.5s ease-in-out";
        slideRef.current.style.transform = `translateX(-${slideRange}px)`;
    },[slideRange]);

    const moveToNextSlide = () =>{
        if(currentImgOrder === IMG_PAGE-1){
            setCurrentImgOrder(0);
            return;
        }
        setCurrentImgOrder(currentImgOrder+1);
    };

    const moveToPrevSlide = () =>{
        if(currentImgOrder === 0){
            setCurrentImgOrder(IMG_PAGE-1);
            return;
        }
        setCurrentImgOrder(currentImgOrder-1);
    };

    const setImage = img_url.map((el) =>{
        return(
            <div>
                <img alt={`${el}`} src={static_url+el} key={el}/>
            </div>
        )
    })

    const cardRander = postData.map((el) =>{
        const num = el.post_num;
        return(
            <Card data = {el} key={num}/>
        )
    })

    return(
        <article className={styles.Post}>
            <section className={styles.slideBox}>
                <button className={styles.controller} id={styles.prev} onClick={moveToPrevSlide}>&lang;</button>
                <div className={styles.slides} ref={slideRef}>
                    {setImage}
                </div>
                <button className={styles.controller} id={styles.next} onClick={moveToNextSlide}>&rang;</button>
            </section>
            <section className={styles.section_profile}>
                <div>
                    <img alt="" src="/img/bros_blank.jpg"/>
                    <div>
                        <p id={styles.nickName}>{name}</p>
                    </div>
                </div>
            </section>
            <section className={styles.section_description}>
                <h1>{title}</h1>
                <p>{price === 0 ? ("무료나눔"):(`${price}원`)}</p>
                <div>
                    <pre>
                        {text}
                    </pre>
                </div>
                <div className={styles.article_count}>
                    <span>조회수 {view}</span>
                </div>
            </section>
            <section className={styles.suggest_item}>
                <div className={styles.suggest_title}>
                    <h1>이런 상품은 어떠세요?</h1>
                    <Link to={"/view"}>더 보기</Link>
                </div>
                <div className={styles.suggest_list}>        
                    {cardRander}
                </div>
            </section>
        </article>
    )
}