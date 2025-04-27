import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'

export default function Auth({toggleActive, flag}) {

    const[login, setLogin] = useState('')
    const[pass, setPass] = useState('')
    const [loginForRev, setLoginForRev] = useState(() => {
        const user = localStorage.getItem('loginForRev')
        return user ? user : 'гость'
    })
    console.log(loginForRev);

    useEffect(() => {
        localStorage.setItem('loginForRev', loginForRev.toString())
    }, [loginForRev])
    const navigate = useNavigate()

    function checkData () {
        const parseData = JSON.parse(localStorage.getItem('user'))
        if(parseData !== null){
        parseData.forEach(element => {
            if(element.login === login && element.pass === pass && !flag){
                    toggleActive()
                    setLoginForRev(login)
            }
        })
        }
    }

    function logOut () {
        if(flag){
            toggleActive()
        }
    }
  return (
        <>
            <div className="auth">
            <h1>Авторизация</h1>
            <p><input type="text" placeholder="Введите логин" onChange={(event) =>{setLogin(event.target.value)}}/></p>
            <p><input type="password" placeholder="Введите пароль" onChange={(event) =>{setPass(event.target.value)}}/></p>
            <button onClick={checkData}>Войти</button><br /><br />
            <button onClick={logOut}>Выйти</button>
            <a onClick={() => {navigate('/reg')}}>Создать</a>
            <button onClick={() => navigate('/')}>На главную</button>
            </div>
        </>
  )
}