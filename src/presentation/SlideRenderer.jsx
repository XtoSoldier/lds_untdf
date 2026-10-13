import { Box, Card, Link, Typography } from '@mui/material'
import UniversityLogo from '../components/UniversityLogo'
import WorkshopContent from './WorkshopContent'
import '../styles/workshop.css'

function SlideHeading({ slide }) {
  return (
    <Box className="slide-heading">
      <Box>
        {slide.kicker && <Typography className="kicker">{slide.kicker}</Typography>}
        <Typography component="h1">{slide.title}</Typography>
        {slide.subtitle && <Typography className="subtitle">{slide.subtitle}</Typography>}
      </Box>
    </Box>
  )
}

function TechLogo({ logo }) {
  return (
    <Box component="span" className="tech-logo">
      <Box component="img" src={logo.src} alt="" aria-hidden="true" />
      {logo.name}
    </Box>
  )
}

function ContentCard({ card }) {
  return (
    <Card className={`deck-card ${card.accent ? `deck-card--${card.accent}` : ''}`}>
      {card.logos && <Box className="tech-logos">{card.logos.map((logo) => <TechLogo key={logo.name} logo={logo} />)}</Box>}
      {card.label && <Typography className="eyebrow">{card.label}</Typography>}
      {card.title && <Typography component="h3">{card.title}</Typography>}
      <Typography>{card.text}</Typography>
    </Card>
  )
}

function Cards({ cards, columns = 3 }) {
  return <Box className={`deck-grid deck-grid--${columns}`}>{cards.map((card, index) => <ContentCard key={`${card.title ?? 'card'}-${index}`} card={card} />)}</Box>
}

function Flow({ items, bidirectional }) {
  return (
    <Box className="deck-flow">
      {items.map((item, index) => (
        <Box key={item.title} className="deck-flow__fragment">
          {index > 0 && <span className="deck-flow__arrow" aria-hidden="true">{bidirectional ? '⇄' : '→'}</span>}
          <Box className="deck-flow__item">
            <Typography component="span">{String(index + 1).padStart(2, '0')}</Typography>
            <Typography component="strong">{item.title}</Typography>
            <Typography component="small">{item.text}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

function Note({ note }) {
  return <Box className="deck-note"><strong>{note.label}</strong>{note.text}</Box>
}

function CoverSlide({ slide, site }) {
  return (
    <>
      <SlideHeading slide={slide} />
      <Box className="academic-banner">
        <UniversityLogo />
        <Box><strong>{site.course}</strong><span>{site.term}</span></Box>
      </Box>
      <Box className="deck-cover">
        <Box className="manifesto"><Typography>{slide.manifesto}</Typography></Box>
        <Box className="goals">
          <Typography className="eyebrow">AL TERMINAR, PODRÁN</Typography>
          <ul>{slide.goals.map((goal) => <li key={goal}>{goal}</li>)}</ul>
        </Box>
      </Box>
    </>
  )
}

function HighlightedQuote({ children }) {
  return children.split(/(\[[^\]]+\])/).map((part) => part.startsWith('[') ? <em key={part}>{part}</em> : part)
}

export default function SlideRenderer({ slide, site }) {
  if (slide.type === 'cover') return <CoverSlide slide={slide} site={site} />

  return (
    <>
      <SlideHeading slide={slide} />
      {slide.type === 'workshop' && <>
        {slide.institutional && <Box className="academic-banner"><UniversityLogo /><Box><strong>{site.course}</strong><span>{site.term}</span></Box></Box>}
        {slide.flow && <Flow items={slide.flow} />}
        {slide.cards && <Cards cards={slide.cards} columns={slide.columns} />}
        <WorkshopContent key={slide.nav} slide={slide} />
        {slide.note && <Note note={slide.note} />}
      </>}
      {slide.type === 'questions' && (
        <Box className="question-grid">
          {slide.items.map((item, index) => (
            <Card className="question-card" key={item.title}>
              <Typography component="b">{String(index + 1).padStart(2, '0')}</Typography>
              <Typography component="strong">{item.title}</Typography>
              <Typography>{item.text}</Typography>
            </Card>
          ))}
        </Box>
      )}
      {slide.type === 'flowCards' && <><Flow items={slide.flow} bidirectional={slide.bidirectional} /><Cards cards={slide.cards} columns={2} /></>}
      {slide.type === 'cards' && <Cards cards={slide.cards} columns={slide.columns} />}
      {slide.type === 'cardsNote' && <><Cards cards={slide.cards} columns={slide.columns} /><Note note={slide.note} /></>}
      {slide.type === 'list' && (
        <Box className="tech-list">{slide.items.map((item) => (
          <Box key={item.logo.name}><TechLogo logo={item.logo} /><Typography><strong>{item.lead}</strong> {item.text}</Typography></Box>
        ))}</Box>
      )}
      {slide.type === 'geoCards' && <>
        <Box className="geo-grid">{slide.capabilities.map((item) => <Box key={item.title}><b>{item.title}</b><small>{item.text}</small></Box>)}</Box>
        <Cards cards={slide.cards} columns={2} />
      </>}
      {slide.type === 'featureCardsNote' && <>
        <Box className="feature-block"><TechLogo logo={slide.feature.logo} /><Typography>{slide.feature.text}</Typography></Box>
        <Cards cards={slide.cards} columns={3} /><Note note={slide.note} />
      </>}
      {slide.type === 'recipes' && <Box className="recipe-list">{slide.items.map((item) => <Box key={item.title}><b>{item.title}</b><Typography>{item.text}</Typography><span>{item.tag}</span></Box>)}</Box>}
      {slide.type === 'decision' && (
        <Box className="deck-grid deck-grid--2">
          <Card className="deck-card">
            <Typography className="eyebrow">{slide.scoreLabel}</Typography>
            <Box component="ul" className="score-list">
              {slide.score.map((criterion) => <li key={criterion}>{criterion}</li>)}
            </Box>
          </Card>
          <Box className="decision-quote">
            <Typography className="eyebrow">{slide.quoteLabel}</Typography>
            <blockquote><HighlightedQuote>{slide.quote}</HighlightedQuote></blockquote>
            <Typography className="subtitle">{slide.closing}</Typography>
          </Box>
        </Box>
      )}
      {slide.type === 'sources' && (
        <Box className="source-grid">{slide.items.map((item) => <Link key={item.url} href={item.url} target="_blank" rel="noopener noreferrer">{item.label} ↗</Link>)}</Box>
      )}
    </>
  )
}
