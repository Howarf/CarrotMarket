import { Link, useNavigate } from "react-router-dom";
import styles from "../../css/SignUp.module.css";
import axios from "axios";
import { useState } from "react";

export default function SignUp(){
    const [id, setId] = useState(null);
    const [pw, setPw] = useState(null);
    const [checkPw, setCheckPw] = useState(null);
    const [phone, setPhone] = useState(null);
    const [name, setName] = useState(null);
    const navigate = useNavigate();
    function check(){
        if(id === null || pw === null || phone === null || name === null){
            alert("빈 텍스트 박스가 존재합니다.");
        }else if(pw !== checkPw){
            alert("비밀번호가 같지않습니다.");
        }else{
            axios.post('/user_info/signUp', null, {
                params:{
                    'id': id,
                    'pw': pw,
                    'name': name,
                    'phone': phone
                }
            }).then(res=>{
                alert(res.data.msg);
                navigate("/account/");
            }).catch()
        }
    }
    function handleInput(e){
        switch (e.target.name){
            case "id":
                setId(e.target.value);
                break;
            case "password":
                setPw(e.target.value);
                break;
            case "checkPW":
                setCheckPw(e.target.value);
                break;
            case "name":
                setName(e.target.value);
                break;
            case "phone":
                setPhone(e.target.value);
                break;
            default:
                break;
        }
    }
    return(
        <div className={styles.content}>
            <div className={styles.main}>
                <form method="post" action="" className={styles.SignUpBox}>
                    <strong>회원가입</strong>
                    <div className={styles.inputBox}>
                        <input className={styles.inputs} id={styles.username} onChange={handleInput} type="text" name="id" placeholder="아이디"/>
                        <label htmlFor="id">아이디 입력</label>
                    </div>
                    <div className={styles.inputBox}>
                        <input className={styles.inputs} id={styles.password} onChange={handleInput} type="password" name="password" placeholder="비밀번호"/>
                        <label htmlFor="password">비밀번호 입력</label>
                    </div>
                    <div className={styles.inputBox}>
                        <input className={styles.inputs} id={styles.chackPW} onChange={handleInput} type="password" name="checkPW" placeholder="비밀번호 확인"/>
                        <label htmlFor="checkPW">비밀번호 확인</label>
                    </div>
                    <div className={styles.inputBox}>
                        <input className={styles.inputs} id={styles.name} onChange={handleInput} type="text" name="name" placeholder="이름"/>
                        <label htmlFor="name">이름 입력</label>
                    </div>
                    <div className={styles.inputBox}>
                        <input className={styles.inputs} id={styles.phonenum} onChange={handleInput} type="text" name="phone" placeholder="휴대폰번호"/>
                        <label htmlFor="phone">휴대폰 번호 (숫자만 입력)</label>
                    </div>
                    <input className={styles.submitBtn} type="button" onClick={check} value="회원가입"/>
                    <div className={styles.linkBox}>
                        <p>이미 계정이 있으신가요?</p>
                        <Link id={styles.link} to={"/account/"}>로그인&gt;</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}