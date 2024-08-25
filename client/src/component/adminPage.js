import { useEffect, useState } from "react";
import styles from "../css/adminPage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Post_modify(){
    const navigater = useNavigate();
    const [post, setPost] = useState([]);
    const static_url = "http://localhost:3000/public/img/";
    const noImg = "/img/no_img.jpg";
    let count = 0;

    useEffect(()=>{
        axios.post('/post/posts', null).then((res)=>{
            setPost(res.data);
        }).catch()
    },[post])

    const arrayPost = post.map(el=>{
        count++;
        return(
            posts(el, count)
        )
    })

    const delBtn = (data) =>{
        if(window.confirm('정말 삭제 하시겠습니까?')){
            axios.post('/post/delet', null, {
                params:{
                    'id': data.u_id,
                    'num': data.post_num,
                },
            }).then((res)=>{
                alert(res.data.msg);
            }).catch()
        }
    }
    const editBtn = (num) =>{
        navigater(`/edit/${num}`);
    }

    const goPost = (postNum) =>{
        if(window.confirm('해당 페이지로 이동하시겠습니까?')){
            navigater(`/view/${postNum}`);
        }
    }

    return(
        <div className={styles.case}>
            <p>등록된 게시물</p>
            <div className={styles.postBox}>
                {arrayPost}
            </div>
            {/* <div className={styles.boxPages}>
                {"< 1 2 3 >"}
            </div> */}
        </div>
    )
    function posts(data, num){
        const firstImg = data.img_url.split(',')[0];
        return(
            <div className={styles.posts}>
                <div className={styles.postImg} onClick={(e)=> {goPost(data.post_num)}}>
                    <div><p>{num}</p></div>
                    <img src={firstImg !== '' ? (static_url+firstImg):(noImg)} alt=""/>
                </div>
                <div className={styles.postInfo} onClick={(e)=> {goPost(data.post_num)}}>
                    <span className={styles.postName}>이름: {data.title}</span>
                    <span className={styles.postPrice}>가격: {data.price === 0 ? "무료나눔" : data.price}</span>
                    <span className={styles.postView}>조회수: {data.view}</span>
                    <span className={styles.userName}>게시자 이름: {data.u_id}</span>
                </div>
                <div className={styles.postText} onClick={(e)=> {goPost(data.post_num)}}>
                    <p>게시물 내용:</p>
                    <pre>{data.data.replaceAll("<br>", "\r\n")}</pre>
                </div>
                <div className={styles.postBtn}>
                    <div className={styles.editBtn} onClick={(e)=> {editBtn(data.post_num)}}><span>Edit</span></div>
                    <div className={styles.delBtn} onClick={(e)=> {delBtn(data)}}><span>Del</span></div>
                </div>
            </div>
        )
    }
}