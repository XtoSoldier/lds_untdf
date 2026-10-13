import { Navigate, useParams } from 'react-router-dom'
import PresentationPlayer from '../presentation/PresentationPlayer'
import classes from '../data/classes.json'
import site from '../data/site.json'
import { presentations } from '../data/presentations'

export default function ClassPage() {
  const { classSlug } = useParams()
  const classItem = classes.find((item) => item.slug === classSlug)
  const presentation = classItem ? presentations[classItem.presentationId] : null

  if (!classItem || !presentation) return <Navigate to="/" replace />

  return <PresentationPlayer classItem={classItem} presentation={presentation} site={site} />
}
