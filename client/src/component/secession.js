import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/secession.module.css"
import axios from "axios";

export default function Secession(){
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const user_id = JSON.parse(sessionStorage.getItem("user_info")).id;

    const handleInput = (e) =>{
        switch(e.target.id){
            case "id":
                setId(e.target.value);
                break;
            case "pw":
                setPw(e.target.value);
                break;
            default: break;
        }
    }
    const consent = () =>{
        if(id === user_id){
            axios.post('/user_info/secession', null, {
                params:{
                    'id':id,
                    'pw':pw,
                }
            }).then(res=>{
                alert(res.data.msg);
                navigate("/");
            }).catch()
        }else{
            alert('입력하신 정보가 틀렸습니다.');
            setId('');
            setPw('');
        }
    }

    return(
        <div className={styles.main}>
            <div className={styles.secession}>
                <strong>회원 탈퇴</strong>
                <div className={styles.guideText}>
                    <p>회원님의 계정을 입력하실경우 계정이 삭제됩니다.</p>
                </div>
                <div className={styles.inputBox}>
                        <input className={styles.inputs} id="id" onChange={handleInput} value={id} type="text" name="username" placeholder="아이디"/>
                        <label htmlFor="id">아이디</label>
                    </div>
                <div className={styles.inputBox}>
                    <input className={styles.inputs} id="pw" onChange={handleInput} value={pw} type="password" name="password" placeholder="비밀번호"/>
                    <label htmlFor="password">비밀번호</label>
                </div>
                <input className={styles.submitBtn} type="button" onClick={consent} value="탈퇴하기"/>
            </div>
        </div>
    )
}