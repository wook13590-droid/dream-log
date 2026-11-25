
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <main className="auth-page">
      <Link to="/" className="auth-logo">
        DREAM LOG
      </Link>

      <section className="auth-container">
        <p className="auth-subtitle">WELCOME BACK</p>

        <h1>다시 만나서 반가워요.</h1>

        <p className="auth-description">
          오늘의 꿈도 DREAM LOG에 기록해 보세요.
        </p>

        <form className="auth-form" onSubmit={handleLogin}>
          <label>이메일</label>
          <input
            type="email"
            placeholder="이메일을 입력해 주세요."
            required
          />

          <label>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            required
          />

          <button type="submit" className="auth-submit">
            로그인하기
          </button>
        </form>

        <p className="auth-bottom">
          아직 계정이 없으신가요?
          <Link to="/signup"> 회원가입</Link>
        </p>
      </section>
    </main>
  )
}

export default Login
