import { useEffect, useState } from "react";
import cards from "../css/card.module.css";
import { Link } from 'react-router-dom';

export default function Cardform(props){
    const post = props.data;
    const [num, setNum] = useState(0);
    const [price, setPrice] = useState(0);
    const [img_url, setImg_url] = useState([]);
    const [title, setTitle] = useState('');
    const [view, setView] = useState(0);
    const static_url = "http://localhost:3000/public/img/";
    const noImg = "/img/no_img.jpg";

    useEffect(()=>{
        if(post){
            setData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[post])

    const setData = () => {
        setNum(post.post_num);
        setPrice(post.price);
        setImg_url(post.img_url.split(','));
        setTitle(post.title);
        setView(post.view);
    }
    if(post){
        return(
            <article className={cards.card}>
                <Link to={`/view/${num}`} className={cards.cardLink}>
                    <div className={cards.cardImg}>
                        <img alt="" src={img_url[0] !== '' ? (static_url+img_url[0]):(noImg)}/>
                    </div>
                    <div className={cards.cardDesc}>
                        <h2 className={cards.cardTitle}>{title}</h2>
                        <div className={cards.cardPrice}>{price === 0 ? ("무료나눔"):(`${price}원`)}</div>
                    </div>
                    <div className={cards.cardCount}>
                        <span>관심 {view}</span>
                    </div>
                </Link>
            </article>
        )
    }
}