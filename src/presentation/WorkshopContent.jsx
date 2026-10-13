import { useState } from 'react'
import { Button } from '@mui/material'
import CodeBlock from './CodeBlock'

function DataTable({ table }) {
  return <div className="workshop-table" data-slide-control onTouchStart={(event) => event.stopPropagation()}><table><thead><tr>{table.headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr></thead><tbody>{table.rows.map((row, index) => <tr key={index}>{row.map((cell, column) => <td key={column}>{cell}</td>)}</tr>)}</tbody></table></div>
}

function Interactive({ slide }) {
  const [selected, setSelected] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const choices = slide.interactive === 'aaa' ? slide.stages : slide.interactive === 'failure' ? slide.implementations : [
    { label: 'Unitario', text: 'AlumnoService aislado: la persistencia se reemplaza por un doble de prueba.' },
    { label: 'Integración', text: 'API, service, repository y base de prueba reales: comprobar respuesta y persistencia.' },
    { label: 'E2E', text: 'Flujo completo desde la interfaz hasta la base de datos de prueba.' },
  ]

  if (slide.interactive === 'challenge') return <div className="workshop-interactive" data-slide-control>
    <Button variant="outlined" onClick={() => setRevealed(!revealed)} aria-expanded={revealed} aria-controls="challenge-solution">{revealed ? 'Ocultar propuesta' : 'Revelar propuesta de solución'}</Button>
    {revealed && <div id="challenge-solution"><DataTable table={slide.solution} /></div>}
  </div>

  return <div className="workshop-interactive" data-slide-control onTouchStart={(event) => event.stopPropagation()}>
    <div className="workshop-choices" role="group" aria-label="Explorar el ejemplo">{choices.map((choice, index) => <Button key={choice.label} variant={selected === index ? 'contained' : 'outlined'} aria-pressed={selected === index} onClick={() => setSelected(index)}>{choice.label}</Button>)}</div>
    {choices[selected].text && <p className="workshop-explanation" aria-live="polite">{choices[selected].text}</p>}
    {slide.interactive === 'aaa' && <CodeBlock code={slide.code} language="python" title="Arrange / Act / Assert" highlightLines={choices[selected].lines} />}
    {slide.interactive === 'failure' && <div className="workshop-code-grid"><CodeBlock key={`implementation-${selected}`} code={choices[selected].code} language="python" title="Implementación" /><CodeBlock key={`output-${selected}`} code={choices[selected].output} title="Salida ilustrativa de pytest" /></div>}
    {slide.interactive === 'architecture' && <ol className="workshop-architecture">{slide.architecture.map((layer, index) => {
      const active = selected === 2 || (selected === 1 && index > 0) || (selected === 0 && index === 2)
      return <li key={layer.title} className={active ? 'participates' : ''}><b>{layer.title}</b><span>{layer.text}</span><small>{active ? 'Participa' : selected === 0 && index === 3 ? 'Doble de prueba' : 'Fuera del alcance'}</small></li>
    })}</ol>}
  </div>
}

export default function WorkshopContent({ slide }) {
  return <div className={`workshop-content ${slide.codes && slide.table ? 'workshop-content--split' : ''} ${slide.codes?.length === 1 && slide.details && !slide.bullets ? 'workshop-content--example' : ''}`}>
    {slide.pyramid && <div className="workshop-pyramid">{slide.pyramid.map((level) => <div key={level.title}><b>{level.title}</b><span>{level.text}</span></div>)}</div>}
    {slide.codes && <div className={`workshop-code-grid ${slide.codes.length === 1 ? 'workshop-code-grid--single' : ''}`}>{slide.codes.map((block, index) => <CodeBlock key={`${slide.nav}-${index}`} {...block} />)}</div>}
    {slide.bullets && <ul className="workshop-bullets">{slide.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
    {slide.table && <DataTable table={slide.table} />}
    {slide.interactive && <Interactive key={slide.nav} slide={slide} />}
    {slide.details?.map((detail) => <details className="workshop-details" key={detail.title} data-slide-control><summary>{detail.title}</summary><p>{detail.text}</p></details>)}
  </div>
}
