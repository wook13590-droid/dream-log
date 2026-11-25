
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './WriteDream.css'

function WriteDream() {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  )
  const [emotion, setEmotion] = useState('행복')

  const emotions = [
    { name: '행복', icon: '☀️' },
    { name: '슬픔', icon: '💧' },
    { name: '불안', icon: '🌧️' },
    { name: '무서움', icon: '🌙' },
    { name: '신기함', icon: '✨' },
    { name: '평온', icon: '☁️' },
  ]

  const handleSave = (e) => {
    e.preventDefault()

    const newDream = {
      id: Date.now(),
      title,
      content,
      date,
      emotion,
    }

    const savedDreams = JSON.parse(
      localStorage.getItem('dreamEntries') || '[]'
    )

    localStorage.setItem(
      'dreamEntries',
      JSON.stringify([...savedDreams, newDream])
    )

    alert('꿈이 일기장에 저장되었어요.')
    navigate('/records')
  }

  return (
    <main className="write-page">
      <header className="write-header">
        <Link to="/dashboard" className="write-logo">
          ☾ DREAM LOG ✦
        </Link>

        <nav className="write-nav">
          <Link to="/dashboard">⌂ 대시보드</Link>
          <Link to="/write" className="write-nav-active">✎ 꿈 기록하기</Link>
          <Link to="/interpret">✧ 꿈 해몽하기</Link>
          <Link to="/records">▤ 나의 기록</Link>
        </nav>
      </header>

      <section className="write-scene">
        <div className="write-paper">
          <div className="write-decoration write-decoration-top">
            🎀
          </div>

          <div className="write-decoration write-decoration-bottom">
            🧸
          </div>

          <div className="write-paper-heading">
            <span>MY LITTLE DREAM DIARY</span>
            <h1>오늘의 꿈을 기록해요 ♡</h1>
            <p>잊혀지기 전에 꿈속의 순간을 담아보세요.</p>
          </div>

          <form className="write-form" onSubmit={handleSave}>
            <div className="write-date-row">
              <label htmlFor="dream-date">✿ 꿈을 꾼 날짜</label>
              <input
                id="dream-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="write-title-row">
              <label htmlFor="dream-title">오늘 꿈의 제목</label>
              <input
                id="dream-title"
                type="text"
                placeholder="꿈에 어울리는 제목을 지어주세요."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="write-content-row">
              <label htmlFor="dream-content">
                꿈속에서 어떤 일이 있었나요?
              </label>

              <textarea
                id="dream-content"
                placeholder={`기억나는 꿈의 장면을 자유롭게 적어보세요.\n\n어디에 있었나요?\n누구를 만났나요?\n어떤 기분이 들었나요?`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                required
              />
            </div>

            <div className="write-emotion-row">
              <label>꿈속에서 느낀 감정은 어땠나요?</label>

              <div className="emotion-options">
                {emotions.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    className={
                      emotion === item.name ? 'emotion-selected' : ''
                    }
                    onClick={() => setEmotion(item.name)}
                  >
                    <span>{item.icon}</span>
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="write-bottom">
              <span>오늘의 꿈도 소중히 간직할게요 ♡</span>

              <button type="submit" className="write-save">
                ♡ 꿈 일기 저장하기
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer className="write-footer">
        DREAM LOG · SWEET DREAMS ALWAYS
      </footer>
    </main>
  )
}

export default WriteDream
