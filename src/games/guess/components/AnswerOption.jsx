// One answer button. States: default, correct, wrong, dimmed (locked and
// neither picked nor correct). Always a real <button>; result state adds an
// icon plus "Correct"/"Wrong" text so color is never the only signal.
export default function AnswerOption({ name, state = 'default', disabled, onSelect }) {
  return (
    <button
      type="button"
      className={`g2-option${state !== 'default' ? ` is-${state}` : ''}`}
      disabled={disabled}
      onClick={onSelect}
    >
      <span className="g2-option__name">{name}</span>
      {state === 'correct' && (
        <span className="g2-option__verdict" aria-hidden="true">✓ Correct</span>
      )}
      {state === 'wrong' && (
        <span className="g2-option__verdict" aria-hidden="true">✗ Wrong</span>
      )}
    </button>
  )
}
