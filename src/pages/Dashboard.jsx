
import { Link } from 'react-router-dom'
import './Dashboard.css'

function Dashboard() {
  const journal = JSON.parse(
    localStorage.getItem('dreamJournal') || 'null'
  ) || {}

  const dreams = JSON.parse(
    localStorage.getItem('dreamEntries') || '[]'
  )

  const name = journal.name || '나의 꿈 일기장'
  const pageColor = journal.pageColor || '#FFFDF7'
  const bookColor = journal.color || '#E8DFF0'

  const fontFamily =
    journal.font === 'serif'
      ? 'serif'
      : journal.font === 'cursive'
        ? 'cursive'
        : "'SUIT', sans-serif"

  const stickerLayouts = journal.stickerLayouts ||
    (journal.stickers || ['🐰', '🌙', '✨']).map(
      (emoji, index) => ({
        id: `sticker-${index}`,
        emoji,
        x: 18 + index * 25,
        y: 25 + index * 18,
        size: 36,
        rotation: 0,
      })
    )

  const recentDreams = [...dreams]
    .sort((a, b) => b.id - a.id)
    .slice(0, 4)

  const today = new Date()
  const dateText = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })

  return (
    <main
      className="diary-dashboard"
      style={{ fontFamily }}
    >
      <header className="diary-topbar">
        <Link to="/dashboard" className="diary-brand">
          <span>☾</span> DREAM LOG
        </Link>

        <nav className="diary-nav">
          <Link to="/dashboard" className="diary-nav-active">
            대시보드
          </Link>
          <Link to="/write">꿈 기록하기</Link>
          <Link to="/interpret">꿈 해몽하기</Link>
          <Link to="/records">나의 기록</Link>
        </nav>

        <Link to="/customize" className="diary-decorate-link">
          🎀 일기장 꾸미기
        </Link>
      </header>

      <section className="diary-scene">
        <div
          className="open-diary"
          style={{ backgroundColor: bookColor }}
        >
          <div className="diary-binding">
            <span>○</span>
            <span>○</span>
            <span>○</span>
            <span>○</span>
          </div>

          {/* 왼쪽 페이지 */}
          <section
            className="diary-page diary-left"
            style={{ backgroundColor: pageColor }}
          >
            <div className="diary-paper-heading">
              <span>MY LITTLE DREAM DIARY</span>
              <h1>{name} ♡</h1>
              <p>나의 작은 꿈들이 머무는 공간</p>
            </div>

            <div className="diary-date">
              <span>✿ TODAY'S DATE</span>
              <strong>{dateText}</strong>
            </div>

            <div className="diary-calendar-note">
              <span className="calendar-note-icon">☁️</span>
              <div>
                <strong>오늘의 작은 기록</strong>
                <p>
                  어젯밤 꾸었던 꿈을 기억하고 있나요?
                  <br />
                  작은 순간도 이곳에 남겨보세요.
                </p>
              </div>
            </div>

            <div className="diary-character">
              <span>🧸</span>
              <p>Sweet dreams always ♡</p>
            </div>

            {/* 사용자가 배치한 스티커 */}
            <div className="diary-custom-stickers">
              {stickerLayouts.map((item) => (
                <span
                  key={item.id}
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    fontSize: `${item.size}px`,
                    transform: `rotate(${item.rotation}deg)`,
                  }}
                >
                  {item.emoji}
                </span>
              ))}
            </div>

            <span className="diary-page-number">01</span>
          </section>

          {/* 오른쪽 페이지 */}
          <section
            className="diary-page diary-right"
            style={{ backgroundColor: pageColor }}
          >
            <div className="diary-right-heading">
              <span>RECENT DREAMS</span>
              <h2>최근에 기록한 꿈 ✧</h2>
              <p>내가 만났던 꿈속의 순간들</p>
            </div>

            {recentDreams.length === 0 ? (
              <div className="diary-empty">
                <span>🌙</span>
                <h3>아직 기록이 없어요.</h3>
                <p>
                  첫 번째 꿈 이야기를
                  <br />
                  일기장에 남겨볼까요?
                </p>
                <Link to="/write">첫 꿈 기록하기 →</Link>
              </div>
            ) : (
              <div className="diary-recent-list">
                {recentDreams.map((dream) => (
                  <article className="diary-entry" key={dream.id}>
                    <div className="diary-entry-date">
                      <span>✿ {dream.date}</span>
                      <span>{dream.emotion}</span>
                    </div>
                    <h3>{dream.title}</h3>
                    <p>{dream.content}</p>
                  </article>
                ))}
              </div>
            )}

            <div className="diary-right-sticker">🐰</div>
            <span className="diary-page-number">02</span>
          </section>
        </div>
      </section>

      <section className="diary-action-menu">
        <Link to="/write" className="diary-action-card">
          <span>✎</span>
          <div>
            <strong>꿈 기록하기</strong>
            <small>오늘 밤의 이야기를 적어봐요.</small>
          </div>
          <b>→</b>
        </Link>

        <Link to="/interpret" className="diary-action-card">
          <span>☾</span>
          <div>
            <strong>꿈 해몽하기</strong>
            <small>꿈속에 담긴 의미를 살펴봐요.</small>
          </div>
          <b>→</b>
        </Link>

        <Link to="/records" className="diary-action-card">
          <span>♡</span>
          <div>
            <strong>나의 기록</strong>
            <small>소중한 꿈들을 다시 만나봐요.</small>
          </div>
          <b>→</b>
        </Link>
      </section>

      <footer className="diary-footer">
        DREAM LOG · EVERY DREAM HAS A STORY
      </footer>
    </main>
  )
}

export default Dashboard
