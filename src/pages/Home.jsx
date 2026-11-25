
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <main className="home">
      <header className="home-header">
        <Link to="/" className="home-logo">
          DREAM LOG
        </Link>

        <nav className="home-nav">
          <Link to="/login">로그인</Link>
          <Link to="/signup" className="signup-button">
            회원가입
          </Link>
        </nav>
      </header>

      <section className="home-content">
        <p className="home-subtitle">
          A LITTLE SPACE FOR YOUR DREAMS
        </p>

        <h1>
          오늘 밤의 꿈을
          <br />
          기록해 보세요.
        </h1>

        <p className="home-description">
          잊혀지기 쉬운 꿈의 순간들을
          <br />
          나만의 일기장에 하나씩 담아보세요.
        </p>

        <div className="home-buttons">
          <Link to="/signup" className="home-primary-button">
            나만의 일기장 만들기
          </Link>

          <Link to="/login" className="home-secondary-button">
            로그인
          </Link>
        </div>
      </section>

      <footer className="home-footer">
        DREAM LOG © 2026
      </footer>
    </main>
  )
}

export default Home
