import { Link } from "react-router-dom"
import { formatMoneyTo2DP, shortDateTime } from "../../../../settings/helpers"
import { currencies, orderStatus, paymentStatus } from "../../../../settings/settings"
import { Badge } from "react-bootstrap"

const Order = ({order}) => {
  return (
    <>
        <p>
            <span className="fw-bold">Order#: </span>
            <span className="FloatRight">{order?._id.substring(0,4)}...{order?._id.substring(order?._id.length - 7, order?._id.length - 1)}</span>
        </p>
        <p>
            <span className="fw-bold">Date: </span><span className="FloatRight">{shortDateTime(order?.dateTime)}</span>
        </p>
        <p>
            {
                order?.dishes?.length > 1 ?
                <span className="fw-bold">Dishes:</span> :
                <span className="fw-bold">Dish:</span>
            }
            <span className="FloatRight">{order?.dishes?.length} <Link to='/dishes' state={order?.dishes} className="DarkGreen">[View]</Link></span>
        </p>
        <p className="DarkBorderTop-1 DarkBorderBottom-2">
            <span className="fw-bold">Total Amt.:</span>
            <span className="FloatRight">{currencies.Naira}{formatMoneyTo2DP(order?.price)}</span>
        </p>
        <span className="d-flex justify-content-end align-items-center">
            <Badge bg={`${paymentStatus[order?.paymentStatus]}`} className="mx-1">{order?.paymentStatus}</Badge>
            <Badge bg={`${orderStatus[order?.status]}`}>{order?.status}</Badge>
        </span>
        <span  className="FloatRight pt-2">
            <Link to={`${order?._id}/tracks`} className="DarkGreen">[Tracks]</Link>
        </span>
    </>
  )
}

export default Order