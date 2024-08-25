import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../css/SignIn.module.css"
import { useState } from "react";

export default function SignIn(){
    const [inputID,setInputID] = useState('');
    const [inputPW,setInputPW] = useState('');
    const navigate = useNavigate();
    const login = () =>{
        axios.post('/user_info/login', null, {
            params: {
                    'user_id': inputID,
                    'user_pw': inputPW
                }
            }).then(res => {
                console.log(res.data);
                if(res.data.userId === undefined || res.data.userId === null){
                    alert('입력하신 아이디나 비밀번호가 일치하지않습니다.');
                    setInputPW("");
                }
                else if(res.data.userId === inputID){
                    console.log('==========로그인 성공==========');
                    const data = {id: inputID, name: res.data.userName}
                    sessionStorage.setItem('user_info', JSON.stringify(data));
                    navigate(-1);
                }
            }).catch()
        }
    const handleInputId = (e) =>{
        setInputID(e.target.value);
    }
    const handleInputPW = (e) =>{
        setInputPW(e.target.value);
    }
    const enterEvent = (e) =>{
        if(e.key === 'Enter') login();
    }
    function backBut(){
        navigate("/");
    }
    return(
        <div className={styles.content}>
            <div className={styles.main}>
                <div className={styles.signInBox}>
                    <strong>로그인</strong>
                    <div className={styles.inputBox}>
                        <input className={styles.inputs} id={styles.username} onChange={handleInputId} value={inputID} type="text" name="username" placeholder="아이디"/>
                        <label htmlFor="username">아이디</label>
                    </div>
                    <div className={styles.inputBox}>
                        <input className={styles.inputs} id={styles.password} onChange={handleInputPW} onKeyDown={enterEvent} value={inputPW} type="password" name="password" placeholder="비밀번호"/>
                        <label htmlFor="password">비밀번호</label>
                    </div>
                    <div className={styles.linkBox}>
                        <Link id={styles.link} to={"/account/signUp"}>회원가입</Link>
                    </div>
                    <input className={styles.submitBtn} type="button" onClick={login} value="로그인"/>
                    <div id={styles.back_but} onClick={backBut}>메인가기</div>
                </div>
            </div>
        </div>
    )
}