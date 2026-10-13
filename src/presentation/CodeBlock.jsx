import { useState } from 'react'
import { Button } from '@mui/material'

// Tokenize without changing whitespace; React escapes source text before rendering.
const tokens = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|#[^\n]*|\/\/[^\n]*|\b(?:def|return|assert|import|from|async|await|const|let|test|if|else|None|True|False|POST|GET|DELETE|HTTP|pytest|python|npm|npx|curl)\b|\b\d+(?:\.\d+)?\b)/g

export default function CodeBlock({ code, language = 'text', title, highlightLines = [] }) {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const [section, setSection] = useState(0)
  const [complete, setComplete] = useState(false)
  const lines = code.split('\n')
  const sections = []
  // Break only at existing blank lines, keeping the original source unchanged.
  for (let start = 0; start < lines.length;) {
    let end = lines.length
    if (lines.length - start > 9) {
      const boundary = lines.findLastIndex((line, index) => index > start && index <= start + 9 && line === '')
      if (boundary > start) end = boundary + 1
    }
    sections.push({ start, end })
    start = end
  }
  const paginated = lines.length > 16 && sections.length > 1
  const range = paginated && !complete ? sections[Math.min(section, sections.length - 1)] : { start: 0, end: lines.length }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setCopyError(false)
    } catch {
      setCopyError(true)
    }
  }

  return (
    <div className="code-block" data-slide-control onTouchStart={(event) => event.stopPropagation()}>
      <div className="code-block__header">
        <span>{title || 'Ejemplo'} <small>{language}</small></span>
        <Button onClick={copy} aria-label={`Copiar ${title || 'código'}`}>{copied ? 'Copiado' : 'Copiar'}</Button>
      </div>
      {paginated && <div className="code-block__sections" role="group" aria-label="Lectura progresiva del código">
        {sections.map((part, index) => <Button key={part.start} aria-pressed={!complete && section === index} onClick={() => { setSection(index); setComplete(false) }}>Parte {index + 1}</Button>)}
        <Button aria-pressed={complete} onClick={() => setComplete(!complete)}>{complete ? 'Por secciones' : 'Código completo'}</Button>
        <small>Líneas {range.start + 1}–{range.end} de {lines.length}</small>
      </div>}
      {copyError && <p role="status">No se pudo acceder al portapapeles.</p>}
      <pre tabIndex={0} aria-label={title || `Código ${language}`}><code>{lines.slice(range.start, range.end).map((line, index) => (
        <span key={range.start + index} className={`code-line ${highlightLines.includes(range.start + index + 1) ? 'code-line--highlight' : ''}`}>{language === 'text' ? line : line.split(tokens).map((part, tokenIndex) => {
          const kind = /^["']/.test(part) ? 'string' : /^(#|\/\/)/.test(part) ? 'comment' : /^\d/.test(part) ? 'number' : /^(def|return|assert|import|from|async|await|const|let|test|if|else|None|True|False|POST|GET|DELETE|HTTP|pytest|python|npm|npx|curl)$/.test(part) ? 'keyword' : ''
          return kind ? <span key={tokenIndex} className={`code-token--${kind}`}>{part}</span> : part
        })}{range.start + index < lines.length - 1 ? '\n' : ''}</span>
      ))}</code></pre>
    </div>
  )
}
