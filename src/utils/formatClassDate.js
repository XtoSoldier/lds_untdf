const CLASS_TIME_ZONE = 'America/Argentina/Ushuaia'

export function formatClassDate(startsAt) {
  const parts = new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: CLASS_TIME_ZONE,
  }).formatToParts(new Date(startsAt))

  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]))
  const day = values.day.padStart(2, '0')
  const month = values.month.padStart(2, '0')
  const hour = values.hour.padStart(2, '0')
  const time = values.minute === '00' ? hour : `${hour}:${values.minute}`
  return `${day}/${month} ${time}hs`
}
