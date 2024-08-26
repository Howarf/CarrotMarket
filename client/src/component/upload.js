import styles from "../css/upload.module.css"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";

export default function Upload(){
    const navigate = useNavigate();
    const params = useParams();
    const [postName, setPostName] = useState('');
    const [text, setText] = useState('');
    const [price, setPrice] = useState('');
    const [preview, setPreview] = useState([]);
    const [postImg, setPostImg] = useState([]);
    const [btnText, setBtnText] = useState('업로드');
    const static_url = "http://localhost:3000/public/img/";
    const formData = new FormData();
    const data = JSON.parse(sessionStorage.getItem('user_info'));

    useEffect(()=>{
        if(params.id){
            if(data.id !== 'admin'){
                axios.post('/post/checkPost', null, {params:{
                    'u_id':data.id, 'postNum':params.id
                }},).then((res)=>{
                    if(res.data[0].result > 0){
                        axios.post('/post/fixLoad', null, {params:{
                            'postNum':params.id,
                            'u_id':data.id,
                        }}).then((res)=>{
                            const imgs = res.data[0].img_url.split(',');
                            imgs.pop();
                            let imgarr = [];
                            imgs.map((el)=>{return(imgarr.push(static_url+el))});
                            setPostName(res.data[0].title);
                            setPrice(res.data[0].price);
                            setText(res.data[0].data);
                            setPreview(imgarr);
                            setPostImg(imgs);
                            setBtnText('수정하기');
                        }).catch()
                    }else{
                        alert('잘못된 접근입니다.');
                        navigate(-1);
                    }
                })
            }else{
                axios.post('/post/fixLoad', null, {params:{
                    'postNum':params.id,
                    'u_id':data.id,
                }}).then((res)=>{
                    const imgs = res.data[0].img_url.split(',');
                    imgs.pop();
                    let imgarr = [];
                    imgs.map((el)=>{return(imgarr.push(static_url+el))});
                    setPostName(res.data[0].title);
                    setPrice(res.data[0].price);
                    setText(res.data[0].data.replaceAll("<br>", "\r\n"));
                    setPreview(imgarr);
                    setPostImg(imgs);
                    setBtnText('수정하기');
                }).catch()
            }
        }
    },[])

    function uploadImg(e){
        const imgArr = e.target.files;
        let imgUrlList = [...preview];
        let imgList = [...postImg];
        for(let i = 0; i < imgArr.length; i++){
            const currentImageUrl = URL.createObjectURL(imgArr[i]);
            imgUrlList.push(currentImageUrl);
            imgList.push(imgArr[i]);
        }
        if(imgUrlList.length > 5){
            imgUrlList = imgUrlList.slice(0, 5);
            imgList = imgList.slice(0, 5);
        }
        setPreview(imgUrlList);
        setPostImg(imgList);
        
    }
    
    function uploadBtn(){
        for(let i = 0; i < postImg.length; i++){
            formData.append('postImg',postImg[i]);
        }
        formData.append('id', data.id);
        formData.append('name', data.name);
        formData.append('title', postName);
        if(price === ''){
            formData.append('price', 0);
        }else{
            formData.append('price', price);
        }
        setText(text.replace(/\n/g, "<br>"));
        formData.append('text', text);
        if(postName === null){
            alert("제목을 적어주세요.");
        }else if(params.id){
            formData.append('post_num', params.id);
            axios.post('/post/fixPost', formData, {
                headers:{'Content-Type': 'multipart/form-data',}
            }).then((res)=>{
                if(window.confirm(res.data.msg+"\n해당페이지로 이동하시겠습니까?")){
                    navigate(`/view/${params.id}`);
                }else{
                    navigate(-1);
                }
            }).catch()
        }else{
            axios.post('/post/upload', formData, {
                headers:{'Content-Type': 'multipart/form-data',}
            }).then(res=>{
                console.log(res.data.msg);
                navigate(-1);
            }).catch()
        }
    }

    function delImg(id){
        setPreview(preview.filter((_, index) => index !== id));
        setPostImg(postImg.filter((_, index) => index !== id));
    }

    function enter(id){
        const btn = document.getElementById(`crossBtn${id}`);
        btn.setAttribute("style", "display:flex");
    }
    function out(id){
        const btn = document.getElementById(`crossBtn${id}`);
        btn.setAttribute("style", "display:none");
    }

    function InputHandle(e){
        switch(e.target.name){
            case "title":
                setPostName(e.target.value);
                break;
            case "price":
                setPrice(e.target.value);
                break;
            case "post":
                setText(e.target.value);
                break;
            default:
                break;
        }
    }
    
    function RetunPage(){
        navigate(-1);
    }

    return(
        <>
            <div className={styles.main}>
                <div className={styles.back_but}>
                    <div onClick={RetunPage}>돌아가기</div>
                </div>
                <div className={styles.addImg}>
                    <label className={styles.imgBox} htmlFor="imgBox">
                        <img width="40" height="40" src="https://img.icons8.com/ios/40/737373/camera--v4.png" alt="camera--v4"/>
                    </label>
                    <input accept="image/*" type="file" name="postImg" id="imgBox" onChange={uploadImg} multiple/>
                    {preview.map((image, id) => (
                        <div className={styles.previewBox} key={id} onMouseOver={() => enter(id)} onMouseOut={() => out(id)}>
                            <img src={image} alt={`${image}-${id}`}/>
                            <span className={styles.delBtn} id={`crossBtn${+id}`} onClick={()=>delImg(id)}>
                                <span id={styles.cross1}/>
                                <span id={styles.cross2}/>
                            </span>
                        </div>
                    ))}
                </div>
                <div className={styles.titles}>
                    <label htmlFor="title">제목</label>
                    <input type="text" onChange={InputHandle} value={postName} name="title" placeholder="제목을 적어주세요."/>
                </div>
                <div className={styles.titles}>
                    <label htmlFor="price">가격</label>
                    <input type="text" onChange={InputHandle} value={price} id="price" name="price" placeholder="₩ 0"/>
                </div>
                <div className={styles.postBox}>
                    <label htmlFor="post">자세한 설명</label>
                    <textarea id={styles.post} type="text" name="post" onChange={InputHandle} value={text} placeholder="제품에대한 상세 설명을 적어주세요."/>
                </div>
                <button id={styles.upload_btn} onClick={uploadBtn}>{btnText}</button>
            </div>
            <Outlet/>
        </>
    )
}