import styles from "../css/Header.module.css"
import { useState,useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

export default function Default_header(){
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [name,SetName] = useState("");
    const [isLogin,SetIslogin] = useState(false);
    const [menu_state, SetMenu_state] = useState(false);
    function checkLogin(){
        const inputBox = document.getElementById("inputBox");
        if(sessionStorage.length > 0){
            const data = JSON.parse(sessionStorage.getItem("user_info"));
            inputBox.setAttribute('style', 'width: 388px');
            SetIslogin(true);
            SetName(data.name);
        }else{
            inputBox.setAttribute('style', 'width: 288px');
            SetIslogin(false);
        }
    }
    function dropdown(){
        const menu = document.getElementById("dropdown");
        if(menu_state){
            menu.setAttribute('style','display:none');
            SetMenu_state(false);
        }else{
            menu.setAttribute('style','display:flex');
            SetMenu_state(true);
        }
    }
    function mouseLeave(){
        const menu = document.getElementById("dropdown");
        menu.setAttribute('style','display:none');
        SetMenu_state(false);
    }
    function logout(){
        if(window.confirm("로그아웃 하겠습니까?")){
            if(location.pathname = "/upload"){
                navigate("/");
            }
            SetIslogin(false);
            sessionStorage.removeItem("user_info");
        }
    }
    useEffect(() => {
        checkLogin();
    },[location])
    return(
        <div className={styles.case}>
            <div className={styles.Header}>
                <Link to={"/"}><img id={styles.logo} src="/img/logo.png" alt="순무마켓"/></Link>
                <ul className={styles.nav}>
                    <li><Link to={"/"} className={styles.Link} id={location.pathname === "/" ? styles.select:''}>중고거래</Link></li>
                    <li><Link to={"/view"} className={styles.Link} id={location.pathname === "/view" || location.pathname === `/view/${params.id}` ? styles.select:''}>매물보기</Link></li>
                </ul>
                <div className={styles.search}>
                    <span className={styles.inputBox} id="inputBox">
                        <span>
                            <input placeholder="물품이나 동네를 검색해보세요"/>
                        </span>
                    </span>
                    {userInfo()}
                </div>
            </div>
        </div>
    )
    function userInfo(){
        if(!isLogin){
            return(
                <span id={styles.btns}>
                    <button onClick={()=>navigate("/account/")}>Login</button>
                    <button onClick={()=>navigate("/account/signUp")}>SignUp</button>
                </span>
            )
        }
        else{
            return(
                <span id={styles.logins}>
                    <div id={styles.name} onClick={dropdown}>
                        <p>{name}</p>
                    </div>
                    <ul className={styles.dropdown} id="dropdown" aria-labelledby="dropdownMenuButton1" onMouseLeave={mouseLeave}>
                        <li><Link className={styles.dropdown_item} to={"/myPage"}>MyPage</Link></li>
                        <li onClick={logout}>Logout</li>
                    </ul>
                </span>
            )   
        }
    }
}