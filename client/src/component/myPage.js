import { Outlet } from "react-router-dom";
import styles from"../css/myPage.module.css";
import { useEffect, useState } from "react";
import InfoModify from "./info_modify";
import Secession from "./secession";
import PostModify from "./post_modify";
import AdminPage from "./adminPage";

export default function MyPage(){
    const [opne, setOpen] = useState(true);
    const [docType, setDocType] = useState('info_modify');

    useEffect(()=>{
        const data = JSON.parse(sessionStorage.getItem("user_info"));
        const check_id = document.getElementById("admin");
        data.id === "admin" ? check_id.setAttribute('style','display:flex') : check_id.setAttribute('style','display:none');
    },[])

    useEffect(()=>{
        window.scrollTo(0,0);
        docRander();
    },[])

    function opneMenu(){
        const miniMenu = document.getElementById("miniMenu");
        if(opne){
            miniMenu.setAttribute('style','display:none');
            setOpen(false);
        }else{
            miniMenu.setAttribute('style','display:flex');
            setOpen(true);
        }
    }

    function changeDoc(e){
        switch(e.target.id){
            case "modify":
                setDocType("info_modify");
                break;
            case "secession":
                setDocType("secession");
                break;
            case "post":
                setDocType("post_modify");
                break;
            case "admin":
                setDocType("admin");
                break;
            default: break;
        }
    }

    function docRander(){
        switch(docType){
            case "info_modify":
                return(<InfoModify/>)
            case "secession":
                return(<Secession/>)
            case "post_modify":
                return(<PostModify/>)
            case "admin":
                return(<AdminPage/>)
            default: break;
        }
    }

    return(
        <div className={styles.main}>
            <div className={styles.sideMenu}>
                <div className={styles.menu} id="user_info" onClick={opneMenu}>
                    <div>회원 정보</div>
                </div>
                <div className={styles.mini_menu} id="miniMenu">
                    <span onClick={changeDoc} id="modify">정보 수정</span>
                    <span onClick={changeDoc} id="secession">회원 탈퇴</span>
                </div>
                <div className={styles.menu} id="post" onClick={changeDoc}>등록한 게시물</div>
                <div className={styles.menu} id="admin" onClick={changeDoc}>관리자용</div>
            </div>
            <div className={styles.mainDoc}>
                {docRander()}
            </div>
            <Outlet/>
        </div>
    )
}