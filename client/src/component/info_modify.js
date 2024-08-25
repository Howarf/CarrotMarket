import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/modify.module.css";
import axios from "axios";

export default function Info_modify(){
    const navigate = useNavigate();
    const [reCheck, setReCheck] = useState(false);
    const [myId, setMyId] = useState('');
    const [name, setName] = useState('');
    const [pw, setPw] = useState('');
    const [checkPw, setCheckPw] = useState('');

    useEffect(()=>{
        const data = JSON.parse(sessionStorage.getItem("user_info"));
        setMyId(data.id);
        setName(data.name);
    },[])

    const handleInput = (e) =>{
        switch(e.target.id){
            case "nickName":
                setName(e.target.value);
                break;
            case "pw":
                setPw(e.target.value);
                break;
            case "checkPw":
                setCheckPw(e.target.value);
                break;
            default: break;
        }
    }

    const enterEvent = (e) =>{
        if(e.key === 'Enter') checkUser();
    }

    const backBut = () =>{
        navigate("/");
    }

    const checkUser = () =>{
        axios.post('/user_info/checkUser', null, {
            params:{
                'id':myId,
                'pw':pw,
            }
        }).then(res=>{
             setReCheck(res.data);
        }).catch()
        setPw('');
    }

    const changeData = () =>{
        if(pw === checkPw){
            axios.post('/user_info/changeData', null, {
                params:{
                    'id':myId,
                    'pw':pw,
                    'name':name,
                }
            }).then(res=>{
                if(res.data.msg){
                    alert(res.data.msg);
                    navigate('/');
                    sessionStorage.removeItem('user_info');
                }
            }).catch()
        }else{
            alert("비밀번호가 동일하지 않습니다.");
            setCheckPw('');
        }
    }

    return(<>{page()}</>)
    
    function page(){
        if(!reCheck){
            return(
                <div className={styles.main}>
                    <div className={styles.signInBox}>
                        <strong>회원 비밀번호 확인</strong>
                        <div className={styles.guideText}>
                            <p>비밀번호를 한번 더 입력해주세요.</p>
                            <p>회원님의 정보를 안전하게 보호하기 위해 비밀번호를 한번 더 확인합니다.</p>
                        </div>
                        <div className={styles.userId}>
                            회원 아이디: <span>{myId}</span>
                        </div>
                        <div className={styles.inputBox}>
                            <input className={styles.inputs} id="pw" onChange={handleInput} onKeyDown={enterEvent} value={pw} type="password" name="password" placeholder="비밀번호"/>
                            <label htmlFor="password">비밀번호</label>
                        </div>
                        <input className={styles.submitBtn} type="button" onClick={checkUser} value="확인하기"/>
                    </div>
                    <div id={styles.back_but} onClick={backBut}>메인가기</div>
                </div>
                )
        }else{
            return(
                <div className={styles.main2}>
                    <div className={styles.infoBox}>
                        <strong>회원정보 변경</strong>
                        <div className={styles.userId}>
                            ID: <span>{myId}</span>
                        </div>
                        <div className={styles.inputBox}>
                            <input className={styles.inputs} id="nickName" onChange={handleInput} value={name} type="text" name="nickName" placeholder="닉네임"/>
                            <label htmlFor="nickName">닉네임</label>
                        </div>
                        <div className={styles.inputBox}>
                            <input className={styles.inputs} id="pw" onChange={handleInput} value={pw} type="password" name="password" placeholder="변경할 비밀번호"/>
                            <label htmlFor="password">변경할 비밀번호</label>
                        </div>
                        <div className={styles.inputBox}>
                            <input className={styles.inputs} id="checkPw" onChange={handleInput} value={checkPw} type="password" name="password" placeholder="비밀번호 확인"/>
                            <label htmlFor="password">비밀번호 확인</label>
                        </div>
                        {pw !== '' ? 
                            (pw === checkPw ? 
                                (<div className={styles.pwGuide} id={styles.greenText}>비밀번호가 일치합니다.</div>) : (<div className={styles.pwGuide} id={styles.redText}>비밀번호가 일치하지않습니다.</div>)) : 
                            (<div className={styles.pwGuide} id={styles.redText}>변경할 비밀번호를 입력하십시오.</div>)
                        }
                        <input className={styles.submitBtn} type="button" onClick={changeData} value="변경하기"/>
                    </div>
                </div>
            )
        }
    }
}