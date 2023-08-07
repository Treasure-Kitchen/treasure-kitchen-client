import { shortDateTime, shortLocalTime } from '../../../../settings/helpers'
import { orderStatus } from '../../../../settings/settings'
import Badge from 'react-bootstrap/Badge'

const Track = ({ track }) => {
  return (
    <div className="timeline-item">
        <div className="timeline-dot"></div>
        <div className="timeline-date fw-bold text-muted">{shortDateTime(track?.dateTime)} {shortLocalTime(track?.dateTime)}</div>
        <Badge bg={`${orderStatus[track?.status]}`} className='p-3 fs-4'>{track?.status}</Badge>
    </div>
  )
}

export default Track