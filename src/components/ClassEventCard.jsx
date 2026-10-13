import { Box, ButtonBase, Chip, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { formatClassDate } from '../utils/formatClassDate'

export default function ClassEventCard({ classItem }) {
  return (
    <ButtonBase
      component={Link}
      to={`/clases/${classItem.slug}`}
      className="class-event"
      aria-label={`Abrir clase ${classItem.title}, ${formatClassDate(classItem.startsAt)}`}
    >
      <Box className="class-event__body">
        <Box className="class-event__meta">
          <Chip label={classItem.status} size="small" className="class-event__status" />
          <Typography component="time" dateTime={classItem.startsAt} className="class-event__date">
            {formatClassDate(classItem.startsAt)}
          </Typography>
        </Box>
        <Typography component="h2" className="class-event__title">
          {classItem.title}
        </Typography>
        <Typography className="class-event__summary">{classItem.summary}</Typography>
      </Box>
      <span className="class-event__arrow" aria-hidden="true">→</span>
    </ButtonBase>
  )
}
