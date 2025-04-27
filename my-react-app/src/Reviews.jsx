import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import img1 from './assets/img/gun1.png'
import img2 from './assets/img/gun2.png'
import img3 from './assets/img/gun3.png'
import img4 from './assets/img/gun4.jpg'

export default function Reviews({ flag }) {
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const [addedTexts, setAddedTexts] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const products = [
    { title: img1, id: 1 },
    { title: img2, id: 2 },
    { title: img3, id: 3 },
    { title: img4, id: 4 }
  ]

  const loginForRev = localStorage.getItem('loginForRev')
  const currentProductId = products[currentIndex].id

  // Загрузка отзывов для текущего товара
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/messages', {
          method: 'GET',
          credentials: 'include'
        })
        const data = await response.json()
        const filtered = data.messages.filter(msg => msg.productId === currentProductId)
        setAddedTexts(filtered)
      } catch (err) {
        console.error('Ошибка при загрузке сообщений:', err)
      }
    }

    fetchMessages()
  }, [currentProductId])

  const handleAddText = async () => {
    if (!text) return

    try {
      const response = await fetch('http://localhost:3000/api/messages', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, productId: currentProductId, user: loginForRev })
      })

      if (response.ok) {
        const newMessage = await response.json()
        setAddedTexts(prev => [...prev, newMessage])
        setText('')
      }
    } catch (e) {
      console.error('Ошибка при отправке сообщения:', e)
    }
  }

  const next = () => setCurrentIndex((prev) => (prev + 1) % products.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)

  if (!flag) {
    return (
      <div>
        <h1>Вы не вошли в аккаунт!</h1>
        <button onClick={() => navigate('/')}>На главную</button>
      </div>
    )
  }

  return (
    <div className="wrapper">
      <div className="arrows">
        <button onClick={prev} className="first-arrow">{'<--'}</button>
        <button onClick={next} className="second-arrow">{'-->'}</button>
      </div>

      <div className="store">
        <div className="product">
          <img src={products[currentIndex].title} alt="" width={300} />
        </div>

        <div className="reviews">
          <div className="scroll-box">
            {addedTexts.map((item, index) => (
              <div key={index}>
                <p>{item.user}: {item.text}</p>
                <hr />
              </div>
            ))}
          </div>

          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Оставьте отзыв"
          />
          <button onClick={handleAddText}>Добавить</button>
        </div>

        <button onClick={() => navigate('/')}>На главную</button>
      </div>
    </div>
  )
}
