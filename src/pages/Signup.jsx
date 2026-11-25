
import { Link, useNavigate } from 'react-router-dom'
import './Signup.css'

function Signup() {
  const navigate = useNavigate()

  const handleSignup = (e) => {
    e.preventDefault()
    navigate('/customize')
  }

  return (
    <main className="auth-page">
      <Link to="/" className="auth-logo">
        DREAM LOG
      </Link>

      <section className="auth-container">
        <p className="auth-subtitle">CREATE YOUR ACCOUNT</p>
        <h1>새로운 꿈 일기를 시작해 보세요.</h1>
        <p className="auth-description">
          나만의 공간에서 꿈을 기록하고 간직해 보세요.
        </p>

        <form className="auth-form" onSubmit={handleSignup}>
          <label>이름</label>
          <input type="text" placeholder="이름을 입력해 주세요." required />

          <label>이메일</label>
          <input type="email" placeholder="이메일을 입력해 주세요." required />

          <label>비밀번호</label>
          <input type="password" placeholder="비밀번호를 입력해 주세요." required minLength={6} />

          <label>비밀번호 확인</label>
          <input type="password" placeholder="비밀번호를 다시 입력해 주세요." required minLength={6} />

          <button type="submit" className="auth-submit">
            회원가입하기
          </button>
        </form>

        <p className="auth-bottom">
          이미 계정이 있으신가요?
          <Link to="/login"> 로그인</Link>
        </p>
      </section>
    </main>
  )
}

export default Signup
