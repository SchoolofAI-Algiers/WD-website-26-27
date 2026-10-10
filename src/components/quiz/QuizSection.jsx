import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CHARACTERS, QUESTIONS, QUESTIONS_PER_ATTEMPT, characterById, drawAttempt, pickWinner, scoreAnswers } from '../../data/sorcererQuiz.js'
import spidey from '../../assets/spiderman.png'
import './QuizSection.css'

const LETTERS = ['A', 'B', 'C', 'D']
const ADVANCE_DELAY = 260

function useDebugFlag() {
  return useMemo(() => {
    try {
      return new URLSearchParams(window.location.search).get('debug') === '1'
    } catch {
      return false
    }
  }, [])
}

function StartScreen({ onStart }) {
  return (
    <div className="g1-screen g1-start" key="start">
      <img src={spidey} alt="" aria-hidden="true" className="g1-start__deco" />
      <p className="g1-eyebrow">GAME 1 · FIND YOUR MULTIVERSE SELF</p>
      <h2 className="g1-title">
        WHICH WIZZERD <span className="g1-title--yellow">ARE U</span>
      </h2>
      <p className="g1-subtitle">
        The ultimate personality test for you — 10 questions, one true wizard.
      </p>
      <ul className="g1-roster" aria-label="The 8 characters you can get">
        {CHARACTERS.map((c) => (
          <li key={c.id} className="g1-roster-card" style={{ '--g1-accent': c.accent }}>
            <img
              className={`g1-roster-avatar${c.cutout ? ' is-cutout' : ' is-photo'}`}
              src={c.avatar}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
            <span className="g1-roster-name">{c.name}</span>
            <span className="g1-roster-trait">{c.title}</span>
          </li>
        ))}
      </ul>
      <div className="g1-cta-row">
        <button type="button" className="g1-btn g1-btn--primary" onClick={onStart}>
          START QUIZ »
        </button>
      </div>
    </div>
  )
}

function QuestionScreen({ total, qIndex, question, answerOrder, picked, locked, selected, onAnswer, onKeySelect }) {
  const letters = LETTERS
  return (
    <div className="g1-screen" key={`q-${qIndex}`}>
      <div className="g1-panel g1-quiz-panel">
        <p className="g1-hud-row" aria-hidden="true">
          <span>1UP&nbsp;&nbsp;{String(qIndex * 2).padStart(5, '0')}</span>
          <span>Q{qIndex + 1} / {total}</span>
        </p>
        <div
          className="g1-progress"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={qIndex + 1}
          aria-label={`Question ${qIndex + 1} of ${total}`}
        >
          {Array.from({ length: total }, (_, i) => (
            <span
              key={i}
              className={
                i < qIndex ? 'g1-progress__seg is-done'
                : i === qIndex ? 'g1-progress__seg is-current'
                : 'g1-progress__seg'
              }
            />
          ))}
        </div>
        <p className="g1-meta">Q{qIndex + 1} · {question.tag} · PICK ONE</p>
        <h3 className="g1-question">{question.text}</h3>
        <div
          className="g1-answers"
          role="radiogroup"
          aria-label={`Question ${qIndex + 1}: ${question.text}`}
          onKeyDown={onKeySelect}
        >
          {answerOrder.map((aIdx, pos) => {
            const answer = question.answers[aIdx]
            const isSelected = (picked ?? selected) === aIdx
            return (
              <button
                key={aIdx}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={locked}
                className={`g1-answer${isSelected ? ' is-selected' : ''}`}
                onClick={() => onAnswer(aIdx)}
              >
                <span className="g1-answer__letter" aria-hidden="true">{letters[pos]}</span>
                <span className="g1-answer__text">{answer.text}</span>
                <span className="g1-answer__check" aria-hidden="true">✓</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function ResultScreen({ winnerId, onRestart, debug, picks, order }) {
  const winner = characterById[winnerId]
  const [shared, setShared] = useState(false)
  const share = useCallback(async () => {
    const text = `I got ${winner.name} (${winner.title}) on SOAI Game 1: Which Sorcerer Are You at ESI?`
    try {
      await navigator.clipboard.writeText(text)
      setShared(true)
    } catch {
      setShared(false)
    }
  }, [winner])
  return (
    <div className="g1-screen" key="result">
      <div className="g1-result-grid">
        <div className="g1-result-copy">
          <p className="g1-eyebrow">YOUR RESULT · 10/10 ANSWERED</p>
          <h2 className="g1-result-name" aria-live="polite">{winner.name}</h2>
          <p className="g1-result-title">{winner.title}</p>
          <p className="g1-result-desc">{winner.description}</p>
          <dl className="g1-stats" aria-label={`${winner.name} details`}>
            <div className="g1-stats__row">
              <dt>TOP TRAIT</dt>
              <dd>{winner.title.replace(/^The /, '').toUpperCase()}</dd>
            </div>
            <div className="g1-stats__row">
              <dt>ANSWERED</dt>
              <dd>10 / 10</dd>
            </div>
          </dl>
          <div className="g1-cta-row g1-cta-row--left">
            <button type="button" className="g1-btn g1-btn--primary" onClick={onRestart}>
              TAKE IT AGAIN »
            </button>
            <a className="g1-btn g1-btn--outline" href="#/">
              BACK TO SITE
            </a>
            <button type="button" className="g1-btn g1-btn--ghost" onClick={share}>
              {shared ? 'COPIED ✓' : 'SHARE RESULT'}
            </button>
          </div>
          {debug && (
            <ol className="g1-debug">
              {picks.map((p, i) => (
                <li key={order[i]}>
                  Q{i + 1}: {p ? `${p.text} (+1 ${p.characters.join(', ')})` : '—'}
                </li>
              ))}
            </ol>
          )}
        </div>
        <div className="g1-result-card g1-poster" style={{ '--g1-accent': winner.accent }} aria-label={`${winner.name} result card`}>
          <span className="g1-poster__corners" aria-hidden="true"><i /><i /><i /><i /></span>
          <div className="g1-poster__top">
            <span>RESULT · 01</span>
            <span className="g1-poster__badge">★ YOU</span>
          </div>
          <div className="g1-poster__art">
            <img
              className={`g1-poster__img${winner.cutout ? ' is-cutout' : ' is-photo'}`}
              src={winner.avatar}
              alt={`${winner.name}, ${winner.title}`}
            />
            <span className="g1-poster__side" aria-hidden="true">{winner.name}</span>
          </div>
          <p className="g1-poster__caption"><span>SOAI · 2026 / 2027</span><span>GAME 1 · SCHOOL</span></p>
        </div>
      </div>
      <div className="g1-all">
        <p className="g1-eyebrow">THE FULL COVEN</p>
        <h3 className="g1-all__title">SEE ALL WIZARDS</h3>
        <ul className="g1-all__grid" aria-label="All eight characters">
          {CHARACTERS.map((c, i) => (
            <li key={c.id}>
              <article
                className="g1-poster g1-poster--mini"
                style={{ '--g1-accent': c.accent }}
                aria-label={`${c.name}, ${c.title}${c.id === winnerId ? ' — your result' : ''}`}
              >
                <div className="g1-poster__top">
                  <span>HERO · 0{i + 1}</span>
                  {c.id === winnerId
                    ? <span className="g1-poster__badge">★ YOU</span>
                    : <span className="g1-poster__badge">{c.title.replace(/^The /, '').toUpperCase()}</span>}
                </div>
                <div className="g1-poster__art g1-poster__art--mini">
                  <img
                    className={`g1-poster__img${c.cutout ? ' is-cutout' : ' is-photo'}`}
                    src={c.avatar}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="g1-poster__side" aria-hidden="true">{c.name}</span>
                </div>
                <div className="g1-poster__copy">
                  <h4>{c.name}</h4>
                  <p>{c.title}</p>
                </div>
                <p className="g1-poster__caption"><span>SOAI · 2026 / 2027</span><span>GAME 1</span></p>
              </article>
            </li>
          ))}
        </ul>
      </div>
      <span className="g1-burst" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => <i key={i} />)}
      </span>
    </div>
  )
}

function QuizSection() {
  const debug = useDebugFlag()
  const [screen, setScreen] = useState('start')
  const [attempt, setAttempt] = useState(() => drawAttempt())
  const [current, setCurrent] = useState(0)
  const [picks, setPicks] = useState([])
  const [selected, setSelected] = useState(null)
  const [locked, setLocked] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const start = useCallback(() => {
    clearTimeout(timer.current)
    setAttempt(drawAttempt())
    setPicks([])
    setCurrent(0)
    setSelected(null)
    setLocked(false)
    setScreen('question')
  }, [])

  const answer = useCallback((aIdx) => {
    if (locked || screen !== 'question') return
    const qIdx = attempt.order[current]
    const question = QUESTIONS[qIdx]
    const picked = question.answers[aIdx]
    setSelected(aIdx)
    setLocked(true)
    timer.current = setTimeout(() => {
      setPicks((prev) => {
        const next = [...prev]
        next[current] = picked
        if (current + 1 >= attempt.order.length) {
          setCurrent(0)
          setScreen('result')
        } else {
          setCurrent((c) => c + 1)
        }
        return next
      })
      setSelected(null)
      setLocked(false)
    }, ADVANCE_DELAY)
  }, [attempt, current, locked, screen])

  const onKeySelect = useCallback((e) => {
    if (locked) return
    const k = e.key.toLowerCase()
    const pos = ['1', 'a'].includes(k) ? 0 : ['2', 'b'].includes(k) ? 1 : ['3', 'c'].includes(k) ? 2 : ['4', 'd'].includes(k) ? 3 : -1
    if (pos >= 0) {
      e.preventDefault()
      const qIdx = attempt.order[current]
      setSelected(attempt.answerOrders[qIdx][pos])
      return
    }
    if (e.key === 'Enter' && selected != null) {
      e.preventDefault()
      answer(selected)
    }
  }, [answer, attempt, current, locked, selected])

  const scores = useMemo(() => scoreAnswers(picks), [picks])
  const winnerId = useMemo(
    () => (screen === 'result' ? pickWinner(scores) : null),
    [screen, scores],
  )

  const qIdx = attempt.order[current]
  const question = QUESTIONS[qIdx]

  return (
    <section id="game-1" className="quiz-section" aria-labelledby="game-1-title">
      <h2 id="game-1-title" className="g1-sr">Game 1: Which Sorcerer Are You at ESI?</h2>
      <p className="g1-live" aria-live="polite">
        {screen === 'question' ? `Question ${current + 1} of ${attempt.order.length}` : screen === 'result' ? `Result: ${winnerId ? characterById[winnerId].name : ''}` : 'Quiz ready'}
      </p>
      {screen === 'start' && <StartScreen onStart={start} />}
      {screen === 'question' && question && (
        <QuestionScreen
          total={attempt.order.length}
          qIndex={current}
          question={question}
          answerOrder={attempt.answerOrders[qIdx]}
          picked={null}
          locked={locked}
          selected={selected}
          onAnswer={answer}
          onKeySelect={onKeySelect}
        />
      )}
      {screen === 'result' && winnerId && (
        <ResultScreen
          winnerId={winnerId}
          onRestart={start}
          debug={debug}
          picks={picks}
          order={attempt.order}
        />
      )}
    </section>
  )
}

export default QuizSection
