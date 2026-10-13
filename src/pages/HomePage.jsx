import { Box, Container, Typography } from '@mui/material'
import ClassEventCard from '../components/ClassEventCard'
import UniversityLogo from '../components/UniversityLogo'
import classes from '../data/classes.json'
import site from '../data/site.json'

export default function HomePage() {
  return (
    <Box component="main" className="planner-home">
      <Container maxWidth="lg" className="planner-home__container">
        <Typography className="planner-home__eyebrow">{site.plannerTitle}</Typography>

        <Box component="header" className="planner-hero">
          <Box className="planner-hero__identity">
            <UniversityLogo className="planner-hero__logo" />
          </Box>
          <Box className="planner-hero__content">
            <Typography component="h1">{site.course}</Typography>
            <Typography className="planner-hero__term">{site.term}</Typography>
            <Box className="planner-hero__teachers">
              <Typography component="strong">Docentes</Typography>
              <Typography>{site.teachers.join(' · ')}</Typography>
            </Box>
          </Box>
        </Box>

        <Box component="section" className="class-agenda" aria-labelledby="classes-heading">
          <Box className="class-agenda__heading">
            <Typography component="h2" id="classes-heading">Clases</Typography>
            <Typography>{classes.length} programada{classes.length === 1 ? '' : 's'}</Typography>
          </Box>
          <Box className="class-agenda__list">
            {classes.map((classItem) => <ClassEventCard key={classItem.id} classItem={classItem} />)}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
