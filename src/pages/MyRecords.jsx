
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './MyRecords.css'

function MyRecords() {
  const [activeTab, setActiveTab] = useState('dreams')

  const dreams = JSON.parse(
    localStorage.getItem('dreamEntries') || '[]'
  )

  const interpretations = JSON.parse(
    localStorage.getItem('dreamInterpretations') || '[]'
  )

  const sortedDreams = [...dreams].reverse()
  const sortedInterpretations = [...interpretations].reverse()

  const activeCount =
    activeTab === 'dreams'
      ? dreams.length
      : interpretations.length

  return (
    <main className="records-page">
      <header className="records-header">
        <Link to="/dashboard" className="records-logo">
          ☾ DREAM LOG ✦
        </Link>

        <nav className="records-nav">
          <Link to="/dashboard">⌂ 대시보드</Link>
          <Link to="/write">✎ 꿈 기록하기</Link>
          <Link to="/interpret">✧ 꿈 해몽하기</Link>
          <Link to="/records" className="records-nav-active">
            ▤ 나의 기록
          </Link>
        </nav>
      </header>

      <section className="records-scene">
        <div className="records-open-diary">
          <div className="records-binding" aria-hidden="true">
            <span>○</span>
            <span>○</span>
            <span>○</span>
          </div>

          <section className="records-paper records-left">
            <span className="records-sticker records-bunny">🐰</span>
            <span className="records-sticker records-star">✦</span>

            <div className="records-left-heading">
              <span>MY DREAM ARCHIVE</span>
              <h1>나의 꿈 보관함 ♡</h1>
              <p>
                꿈속에서 만났던 소중한 순간들을
                <br />
                이곳에 차곡차곡 모아보세요.
              </p>
            </div>

            <div className="records-tabs">
              <button
                className={activeTab === 'dreams' ? 'active' : ''}
                onClick={() => setActiveTab('dreams')}
              >
                <span>✎</span>
                꿈 기록
                <small>{dreams.length}</small>
              </button>

              <button
                className={
                  activeTab === 'interpretations' ? 'active' : ''
                }
                onClick={() => setActiveTab('interpretations')}
              >
                <span>✧</span>
                해몽 결과
                <small>{interpretations.length}</small>
              </button>
            </div>

            <div className="records-summary">
              <span>현재 보관 중인 기록</span>
              <strong>{activeCount}</strong>
              <span>개의 소중한 이야기 ♡</span>
            </div>

            <div className="records-left-message">
              <span>🧸</span>
              <p>
                작은 꿈 하나도
                <br />
                소중한 추억이 될 거예요.
              </p>
            </div>

            <div className="records-page-number">01</div>
          </section>

          <section className="records-paper records-right">
            <span className="records-sticker records-ribbon">🎀</span>

            <div className="records-right-heading">
              <span>
                {activeTab === 'dreams'
                  ? 'MY DREAM JOURNAL'
                  : 'MY DREAM MESSAGE'}
              </span>

              <h2>
                {activeTab === 'dreams'
                  ? '꿈 기록 모아보기'
                  : '꿈 해몽 모아보기'}
              </h2>

              <p>
                {activeTab === 'dreams'
                  ? '내가 꾸었던 꿈을 다시 떠올려 봐요.'
                  : '꿈속에 담긴 이야기를 다시 만나봐요.'}
              </p>
            </div>

            {activeTab === 'dreams' ? (
              sortedDreams.length === 0 ? (
                <div className="records-empty">
                  <span>☁️</span>
                  <h3>아직 비어 있는 페이지예요.</h3>
                  <p>첫 번째 꿈 이야기를 기록해 볼까요?</p>
                  <Link to="/write">꿈 기록하러 가기 →</Link>
                </div>
              ) : (
                <div className="records-list" key="dreams">
                  {sortedDreams.map((dream) => (
                    <article className="record-card" key={dream.id}>
                      <div className="record-card-top">
                        <span>✿ {dream.date}</span>
                        <span className="record-emotion">
                          {dream.emotion}
                        </span>
                      </div>

                      <h3>{dream.title}</h3>
                      <p>{dream.content}</p>
                      <span className="record-card-deco">♡</span>
                    </article>
                  ))}
                </div>
              )
            ) : (
              sortedInterpretations.length === 0 ? (
                <div className="records-empty">
                  <span>🌙</span>
                  <h3>아직 해몽 결과가 없어요.</h3>
                  <p>궁금한 꿈의 의미를 살펴보세요.</p>
                  <Link to="/interpret">꿈 해몽하러 가기 →</Link>
                </div>
              ) : (
                <div className="records-list" key="interpretations">
                  {sortedInterpretations.map((item) => (
                    <article className="record-card interpretation-card" key={item.id}>
                      <div className="record-card-top">
                        <span>✧ {item.date}</span>
                        <span className="record-emotion">
                          DREAM MESSAGE
                        </span>
                      </div>

                      <h3>꿈속에서의 이야기</h3>

                      <div className="record-dream">
                        <span>MY DREAM</span>
                        <p>{item.dream}</p>
                      </div>

                      <div className="record-interpretation">
                        <span>꿈에 담긴 의미</span>
                        <p>{item.interpretation}</p>
                      </div>

                      <span className="record-card-deco">✦</span>
                    </article>
                  ))}
                </div>
              )
            )}

            <div className="records-page-number">02</div>
          </section>
        </div>
      </section>

      <footer className="records-footer">
        DREAM LOG · EVERY DREAM HAS A STORY
      </footer>
    </main>
  )
}

export default MyRecords
