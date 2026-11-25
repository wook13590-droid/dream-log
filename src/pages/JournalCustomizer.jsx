
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './JournalCustomizer.css'

function JournalCustomizer() {
  const navigate = useNavigate()

  const savedJournal = JSON.parse(
    localStorage.getItem('dreamJournal') || 'null'
  ) || {}

  const [journalName, setJournalName] = useState(
    savedJournal.name || '나의 꿈 일기장'
  )
  const [coverColor, setCoverColor] = useState(
    savedJournal.color || '#E8DFF0'
  )
  const [pageColor, setPageColor] = useState(
    savedJournal.pageColor || '#FFFDF7'
  )
  const [font, setFont] = useState(
    savedJournal.font || 'SUIT'
  )
  const [stickers, setStickers] = useState(
    savedJournal.stickers || ['🐰', '🌙', '✨']
  )

  const initialLayouts = savedJournal.stickerLayouts ||
    (savedJournal.stickers || ['🐰', '🌙', '✨']).map(
      (emoji, index) => ({
        id: `sticker-${index}`,
        emoji,
        x: 18 + index * 25,
        y: 20 + index * 18,
        size: 36,
        rotation: 0,
      })
    )

  const [layouts, setLayouts] = useState(initialLayouts)
  const [selectedId, setSelectedId] = useState(null)

  const coverColors = [
    '#E8DFF0', '#F2DFE2', '#E5EBDD', '#E1E8F2',
    '#F1E5D3', '#F4EACB', '#D9E8E3', '#EADFD5',
  ]

  const pageColors = [
    '#FFFDF7', '#FFF2F0', '#F5F0FA',
    '#F0F4EA', '#F2F5FA', '#FFF5E6',
  ]

  const stickerOptions = [
    '🐰', '🐻', '🐱', '🐼',
    '🌙', '⭐', '☁️', '🎀',
    '🌷', '🧸', '🦋', '🍓',
    '💗', '✨', '🌼', '🍀',
  ]

  const selectedSticker = layouts.find(
    (item) => item.id === selectedId
  )

  const addSticker = (emoji) => {
    const id = `sticker-${Date.now()}`

    const newSticker = {
      id,
      emoji,
      x: 35 + (layouts.length % 3) * 12,
      y: 30 + (layouts.length % 4) * 12,
      size: 36,
      rotation: 0,
    }

    setLayouts((prev) => [...prev, newSticker])
    setStickers((prev) =>
      prev.includes(emoji) ? prev : [...prev, emoji]
    )
    setSelectedId(id)
  }

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('stickerId', id)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDrop = (e) => {
    e.preventDefault()

    const id = e.dataTransfer.getData('stickerId')
    const area = e.currentTarget.getBoundingClientRect()

    const x = Math.max(
      3,
      Math.min(90, ((e.clientX - area.left) / area.width) * 100)
    )
    const y = Math.max(
      3,
      Math.min(90, ((e.clientY - area.top) / area.height) * 100)
    )

    setLayouts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, x, y } : item
      )
    )

    setSelectedId(id)
  }

  const updateSelected = (property, value) => {
    setLayouts((prev) =>
      prev.map((item) =>
        item.id === selectedId
          ? { ...item, [property]: value }
          : item
      )
    )
  }

  const removeSelected = () => {
    if (!selectedId) return

    setLayouts((prev) =>
      prev.filter((item) => item.id !== selectedId)
    )
    setSelectedId(null)
  }

  const handleSave = () => {
    const journal = {
      name: journalName.trim() || '나의 꿈 일기장',
      color: coverColor,
      pageColor,
      font,
      stickers,
      stickerLayouts: layouts,
    }

    localStorage.setItem('dreamJournal', JSON.stringify(journal))

    alert('나만의 일기장이 저장되었어요! ♡')
    navigate('/dashboard')
  }

  return (
    <main className="customizer-page">
      <header className="customizer-header">
        <Link to="/dashboard" className="customizer-logo">
          ☾ DREAM LOG ✦
        </Link>

        <nav className="customizer-nav">
          <Link to="/dashboard">⌂ 대시보드</Link>
          <Link to="/write">✎ 꿈 기록하기</Link>
          <Link to="/interpret">✧ 꿈 해몽하기</Link>
          <Link to="/records">▤ 나의 기록</Link>
        </nav>
      </header>

      <section className="customizer-container">
        <div className="customizer-heading">
          <span>MAKE YOUR OWN JOURNAL</span>
          <h1>나만의 일기장을 꾸며봐요 ♡</h1>
          <p>
            좋아하는 색과 캐릭터를 골라
            <br />
            세상에 하나뿐인 나만의 꿈 일기장을 만들어 보세요.
          </p>
        </div>

        <div className="customizer-layout">
          <section className="customizer-options">
            <div className="customizer-section">
              <h2>01. 일기장 이름</h2>
              <p>나만의 일기장에 이름을 붙여주세요.</p>
              <input
                value={journalName}
                onChange={(e) => setJournalName(e.target.value)}
                maxLength={20}
                placeholder="나의 꿈 일기장"
              />
            </div>

            <div className="customizer-section">
              <h2>02. 표지 색상</h2>
              <p>마음에 드는 표지 색상을 선택해 보세요.</p>
              <div className="customizer-color-list">
                {coverColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={coverColor === color ? 'selected' : ''}
                    style={{ backgroundColor: color }}
                    onClick={() => setCoverColor(color)}
                    aria-label={`표지 색상 ${color}`}
                  />
                ))}
              </div>
            </div>

            <div className="customizer-section">
              <h2>03. 속지 배경</h2>
              <p>꿈을 기록할 종이의 색을 골라보세요.</p>
              <div className="customizer-color-list">
                {pageColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={pageColor === color ? 'selected' : ''}
                    style={{ backgroundColor: color }}
                    onClick={() => setPageColor(color)}
                    aria-label={`속지 색상 ${color}`}
                  />
                ))}
              </div>
            </div>

            <div className="customizer-section">
              <h2>04. 글씨체 선택</h2>
              <p>일기장에 어울리는 글씨체를 골라보세요.</p>
              <div className="customizer-font-list">
                {[
                  { name: 'SUIT', label: '깔끔한 기본 글씨' },
                  { name: 'serif', label: '감성적인 명조 글씨' },
                  { name: 'cursive', label: '손글씨 느낌' },
                ].map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    className={font === item.name ? 'selected' : ''}
                    onClick={() => setFont(item.name)}
                  >
                    <span>{item.name}</span>
                    <small>{item.label}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="customizer-section">
              <h2>05. 스티커 붙이기</h2>
              <p>캐릭터를 누르면 미리보기에 추가돼요.</p>
              <div className="customizer-sticker-list">
                {stickerOptions.map((sticker, index) => (
                  <button
                    key={`${sticker}-${index}`}
                    type="button"
                    onClick={() => addSticker(sticker)}
                  >
                    {sticker}
                  </button>
                ))}
              </div>
              <span className="customizer-help">
                추가한 스티커는 미리보기에서 드래그할 수 있어요.
              </span>
            </div>
          </section>

          <section className="customizer-preview-area">
            <div className="customizer-preview-heading">
              <span>LIVE PREVIEW</span>
              <h2>나의 일기장 미리보기</h2>
            </div>

            <div
              className="customizer-preview"
              style={{
                backgroundColor: coverColor,
                fontFamily:
                  font === 'SUIT' ? "'SUIT', sans-serif" : font,
              }}
            >
              <div className="preview-ribbon">♡</div>

              <div
                className="preview-paper"
                style={{ backgroundColor: pageColor }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => setSelectedId(null)}
              >
                <span className="preview-label">
                  MY LITTLE DREAM DIARY
                </span>

                <h3>{journalName || '나의 꿈 일기장'}</h3>
                <p>나만의 작은 꿈 기록 공간</p>

                <div className="preview-divider">
                  ─── ♡ ───
                </div>

                <div className="preview-sticker-area">
                  {layouts.map((item) => (
                    <span
                      key={item.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item.id)}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedId(item.id)
                      }}
                      className={`preview-draggable-sticker ${
                        selectedId === item.id ? 'sticker-active' : ''
                      }`}
                      style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        fontSize: `${item.size}px`,
                        transform: `rotate(${item.rotation}deg)`,
                      }}
                      title="드래그해서 이동하기"
                    >
                      {item.emoji}
                    </span>
                  ))}
                </div>

                <div className="preview-note">
                  오늘의 꿈도
                  <br />
                  소중하게 간직하기 ♡
                </div>
              </div>
            </div>

            <div className="sticker-editor">
              <h3>✧ 선택한 스티커 편집</h3>

              {selectedSticker ? (
                <>
                  <div className="sticker-editor-selected">
                    <span>{selectedSticker.emoji}</span>
                    <p>선택한 스티커를 꾸며보세요.</p>
                  </div>

                  <label>
                    크기 조절
                    <strong>{selectedSticker.size}px</strong>
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="65"
                    value={selectedSticker.size}
                    onChange={(e) =>
                      updateSelected('size', Number(e.target.value))
                    }
                  />

                  <div className="sticker-rotate-controls">
                    <button
                      type="button"
                      onClick={() =>
                        updateSelected(
                          'rotation',
                          selectedSticker.rotation - 15
                        )
                      }
                    >
                      ↶ 왼쪽 회전
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        updateSelected(
                          'rotation',
                          selectedSticker.rotation + 15
                        )
                      }
                    >
                      오른쪽 회전 ↷
                    </button>
                  </div>

                  <button
                    type="button"
                    className="sticker-remove-button"
                    onClick={removeSelected}
                  >
                    선택한 스티커 삭제
                  </button>
                </>
              ) : (
                <p className="sticker-editor-empty">
                  미리보기의 스티커를 클릭하면
                  <br />
                  크기와 회전을 조절할 수 있어요.
                </p>
              )}
            </div>

            <p className="customizer-preview-note">
              ✧ 스티커를 마우스로 끌어서 원하는 곳에 놓아보세요.
            </p>

            <button
              className="customizer-save-button"
              onClick={handleSave}
            >
              ♡ 나만의 일기장 저장하기
            </button>
          </section>
        </div>
      </section>

      <footer className="customizer-footer">
        DREAM LOG · MAKE YOUR OWN DREAM SPACE
      </footer>
    </main>
  )
}

export default JournalCustomizer
