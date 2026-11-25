
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './InterpretDream.css'

function InterpretDream() {
  const [dream, setDream] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(false)

  const interpretation =
    '이 꿈은 현재의 감정과 새로운 변화에 대한 기대를 상징할 수 있어요. 꿈속에서 느꼈던 감정은 지금 마음속에 담아둔 생각을 보여주는 단서일지도 몰라요. 새로운 경험을 앞두고 있다면 너무 걱정하지 말고 천천히 자신만의 속도로 나아가 보세요.'

  const handleInterpret = () => {
    if (!dream.trim()) {
      alert('꿈 내용을 먼저 입력해 주세요.')
      return
    }

    setLoading(true)
    setResult(false)

    setTimeout(() => {
      setLoading(false)
      setResult(true)
    }, 2500)
  }

  const closeResult = () => {
    setResult(false)
  }

  const saveInterpretation = () => {
    const newResult = {
      id: Date.now(),
      dream,
      interpretation,
      date: new Date().toISOString().slice(0, 10),
    }

    const savedResults = JSON.parse(
      localStorage.getItem('dreamInterpretations') || '[]'
    )

    localStorage.setItem(
      'dreamInterpretations',
      JSON.stringify([...savedResults, newResult])
    )

    alert('해몽 결과가 저장되었어요.')
    setDream('')
    setResult(false)
  }

  return (
    <main className="interpret-page">
      <header className="interpret-header">
        <Link to="/dashboard" className="interpret-logo">
          ☾ DREAM LOG ✦
        </Link>

        <nav className="interpret-nav">
          <Link to="/dashboard">⌂ 대시보드</Link>
          <Link to="/write">✎ 꿈 기록하기</Link>
          <Link to="/interpret" className="interpret-nav-active">
            ✧ 꿈 해몽하기
          </Link>
          <Link to="/records">▤ 나의 기록</Link>
        </nav>
      </header>

      <section className="interpret-scene">
        <div className="interpret-paper">
          <span className="interpret-decoration interpret-decoration-top">
            🌙
          </span>
          <span className="interpret-decoration interpret-decoration-bottom">
            🐰
          </span>

          <div className="interpret-heading">
            <span>EXPLORE YOUR DREAM</span>
            <h1>꿈속 이야기가 궁금한가요? ✧</h1>
            <p>기억나는 꿈을 적어주면 그 안에 담긴 이야기를 살펴볼게요.</p>
          </div>

          <div className="interpret-input-area">
            <label htmlFor="interpret-dream">
              오늘 밤 기억에 남은 꿈
            </label>

            <textarea
              id="interpret-dream"
              rows={9}
              placeholder={`꿈속에서 어떤 일이 있었나요?\n\n기억나는 장면과 등장인물, 그때의 감정을 자유롭게 적어주세요.`}
              value={dream}
              onChange={(e) => setDream(e.target.value)}
            />

            <div className="interpret-input-footer">
              <span>{dream.length}자 기록 중</span>

              <button
                className="interpret-button"
                onClick={handleInterpret}
                disabled={loading}
              >
                {loading ? '꿈을 살펴보는 중...' : '✧ 꿈 해몽하기'}
              </button>
            </div>
          </div>

          <p className="interpret-paper-note">
            오늘의 꿈도 소중한 이야기로 간직해 보세요 ♡
          </p>
        </div>
      </section>

      <footer className="interpret-footer">
        DREAM LOG · SWEET DREAMS ALWAYS
      </footer>

      {loading && (
        <div className="interpret-loading-overlay">
          <div className="interpret-loading-card">
            <div className="loading-moon">☾</div>
            <div className="loading-stars">✦　✧　✦</div>
            <h2>꿈속을 여행하고 있어요.</h2>
            <p>당신의 꿈에 담긴 이야기를 살펴보는 중...</p>
            <div className="loading-dots">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      )}

      {result && (
        <div
          className="interpret-modal-overlay"
          onClick={closeResult}
        >
          <section
            className="interpret-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="interpret-result-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="interpret-modal-close"
              onClick={closeResult}
              aria-label="해몽 결과 닫기"
            >
              ×
            </button>

            <div className="modal-decoration modal-decoration-left">
              🐰
            </div>
            <div className="modal-decoration modal-decoration-right">
              ✦
            </div>

            <div className="modal-content">
              <span className="modal-label">
                ✧ YOUR DREAM MESSAGE ✧
              </span>

              <div className="modal-moon">☾</div>

              <h2 id="interpret-result-title">
                당신의 꿈 이야기
              </h2>

              <div className="modal-divider">
                ♡ ───────── ✧ ───────── ♡
              </div>

              <div className="modal-dream">
                <span>MY DREAM</span>
                <p>{dream}</p>
              </div>

              <div className="modal-interpretation">
                <span>꿈에 담긴 의미</span>
                <p>{interpretation}</p>
              </div>

              <p className="modal-note">
                ※ 이 결과는 DREAM LOG 포트폴리오용 예시 해몽입니다.
              </p>

              <button
                className="modal-save-button"
                onClick={saveInterpretation}
              >
                ♡ 해몽 결과 저장하기
              </button>

              <button
                className="modal-close-text"
                onClick={closeResult}
              >
                닫기
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}

export default InterpretDream
