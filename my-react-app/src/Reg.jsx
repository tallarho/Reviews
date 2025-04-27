import { useState } from "react"
import {useNavigate} from 'react-router-dom'
export default function Reg({onLogin}) {
    
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    const navigate = useNavigate()
    const handleSubmit = () => {

        const newUser = {
            login: login,
            pass: pass
        }

        let arr = []
        const saved = localStorage.getItem('user') 
        if( saved !== null){
            try{
                arr = JSON.parse(saved)
            } catch (e) {
                console.error('Ошибка', e)
                arr = []
            }
        }

        arr.push(newUser)

        localStorage.setItem('user', JSON.stringify(arr))

        setLogin('')
        setPass('')
        alert('Успех!')
    }
    
  
    return (
     <div>
      <div className="reg">
        <h1>Регистрация</h1>
        <p><input type="text" onChange={(event) =>{setLogin(event.target.value)}} placeholder="Введите логин"/></p>
        <p><input type="password" onChange={(event) =>{setPass(event.target.value)}} placeholder="Введите пароль"/></p>
        <button onClick={handleSubmit}>Создать</button><br />
        <a onClick={() => navigate('/auth')}>Войти</a>
        <button onClick={() => navigate('/')}>На главную</button>
      </div>
     </div>
    )
  }