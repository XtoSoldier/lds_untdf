import { Box } from '@mui/material'
import site from '../data/site.json'

export default function UniversityLogo({ className = '' }) {
  return (
    <Box
      component="img"
      className={className}
      src={site.logoUrl}
      alt={`Logo de la ${site.institution}`}
    />
  )
}
