import { useEffect, useRef, useState } from 'react'
import { Box, Button, ButtonBase, Drawer, LinearProgress, Typography, useMediaQuery } from '@mui/material'
import { Link } from 'react-router-dom'
import SlideRenderer from './SlideRenderer'

function SlideNavigation({ active, onSelect, presentation, site }) {
  return (
    <Box className="slide-navigation">
      <ButtonBase component={Link} to="/" className="deck-brand" aria-label="Volver al planificador">
        <span className="deck-brand__mark">A</span>
        <span><b>{presentation.shortTitle}</b><small>{site.plannerTitle}</small></span>
      </ButtonBase>
      <Box component="nav" aria-label="Diapositivas">
        {presentation.slides.map((slide, index) => (
          <ButtonBase
            key={slide.nav}
            className={active === index ? 'active' : ''}
            onClick={() => onSelect(index)}
            aria-current={active === index ? 'step' : undefined}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>{slide.nav}
          </ButtonBase>
        ))}
      </Box>
    </Box>
  )
}

export default function PresentationPlayer({ classItem, presentation, site }) {
  const [active, setActive] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const touchStart = useRef(null)
  const viewportRef = useRef(null)
  const isMobile = useMediaQuery('(max-width:720px)')
  const total = presentation.slides.length

  const show = (index) => {
    setActive(Math.max(0, Math.min(total - 1, index)))
    setMenuOpen(false)
    viewportRef.current?.scrollTo({ top: 0 })
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      const tagName = event.target.tagName
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tagName) || event.target.isContentEditable) return
      if (['ArrowRight', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault()
        setActive((current) => Math.min(total - 1, current + 1))
      }
      if (['ArrowLeft', 'PageUp'].includes(event.key)) {
        event.preventDefault()
        setActive((current) => Math.max(0, current - 1))
      }
      if (event.key === 'Home') setActive(0)
      if (event.key === 'End') setActive(total - 1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [total])

  const navigation = <SlideNavigation active={active} onSelect={show} presentation={presentation} site={site} />

  return (
    <Box className="presentation-shell">
      {!isMobile && <Box component="aside" className="deck-sidebar">{navigation}</Box>}
      {isMobile && (
        <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} slotProps={{ paper: { className: 'deck-drawer-paper' } }}>
          {navigation}
        </Drawer>
      )}

      <Box className="deck-stage">
        <Box component="header" className="deck-topbar">
          {isMobile && <ButtonBase className="deck-menu" onClick={() => setMenuOpen(true)} aria-label="Abrir menú" aria-expanded={menuOpen}>☰</ButtonBase>}
          <Box className="deck-progress">
            <span>{String(active + 1).padStart(2, '0')}</span>
            <LinearProgress variant="determinate" value={((active + 1) / total) * 100} />
            <span>{String(total).padStart(2, '0')}</span>
          </Box>
          <Typography className="deck-subject">{classItem.title}</Typography>
        </Box>

        <Box
          component="main"
          className="deck-viewport"
          ref={viewportRef}
          onTouchStart={(event) => { touchStart.current = event.touches[0].clientX }}
          onTouchEnd={(event) => {
            if (touchStart.current === null) return
            const distance = event.changedTouches[0].clientX - touchStart.current
            if (distance < -55) show(active + 1)
            if (distance > 55) show(active - 1)
            touchStart.current = null
          }}
        >
          <Box component="section" className="deck-slide" aria-live="polite" aria-label={`Diapositiva ${active + 1} de ${total}`}>
            <SlideRenderer slide={presentation.slides[active]} site={site} />
          </Box>
        </Box>

        <Box component="footer" className="deck-footer">
          <Button onClick={() => show(active - 1)} disabled={active === 0}>← <span>Anterior</span></Button>
          <Box className="deck-course"><b>{site.institutionShort}</b><span>{site.course}</span><span>{site.term}</span></Box>
          <Button onClick={() => show(active + 1)} disabled={active === total - 1}><span>Siguiente</span> →</Button>
        </Box>
      </Box>
    </Box>
  )
}
