import {useNavigate} from 'react-router-dom'

export default function Home () {
    const navigate = useNavigate()
   return (
    <>
    <div className="home">
        <h1>Добро пожаловать!</h1>
        <h2>Перейдите на интересующий вас раздел:</h2>
        <div className="pages">
            <button onClick={()=>navigate('/auth')}>Авторизация</button>
            <button onClick={()=>navigate('/reg')}>Регистрация</button>
            <button onClick={()=>navigate('/reviews')}>Чат</button>
        </div>
    </div>
    </>
   ) 
}