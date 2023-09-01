import { Link } from "react-router-dom"
import { formatMoneyTo2DP, shortDateTime } from "../../../../settings/helpers"
import { currencies, orderStatus, paymentStatus } from "../../../../settings/settings"
import { Badge, Button } from "react-bootstrap"
import { useCancelOrderMutation, useDeleteOrderMutation } from "../../../api/orderApi"
import { toast } from "react-toastify"
import { useEffect } from "react"

const Order = ({order}) => {
    const [remove, { data, isError, error, isSuccess }] = useDeleteOrderMutation();
    const [cancel, 
            { data: cancelData, isError: isCancelError, error: cancelError, isSuccess: isCancelSuccess }
        ] = useCancelOrderMutation();

    const onDelete = async () => {
        if(order?._id){
            await remove(order?._id);
        } else {
            toast.error("Your request can not be completed at this moment. Please try again later.");
        }
    }

    const onCancel = async () => {
        if(order?._id){
            await cancel(order?._id);
        } else {
            toast.error("Your request can not be completed at this moment. Please try again later.");
        }
    }

    useEffect(() => {
        if (isError){
            toast.error(error?.data?.message);
        }

        if(isCancelError){
            toast.error(cancelError?.data?.message);
        }
    }, [error, isError, isCancelError, cancelError]);

    useEffect(() => {
        if (data || isSuccess){
            toast.success(data?.message);
        }

        if(cancelData || isCancelSuccess){
            toast.success(cancelData?.message);
        }
    }, [isSuccess, data, cancelData, isCancelSuccess])

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
        <div  className="FloatRight pt-2">
            {
                order?.status !== "Completed" && 
                order?.status !== "Confirmed" ?
                    <>
                        <Link to={`/orders/${order?._id}/payment`} className="DarkGreen fw-bold">[Pay]</Link>
                        <Button onClick={onDelete} className="text-danger fw-bold DeLink m-auto mb-1 mx-2">[Delete]</Button>
                        {
                            order?.status !== "Cancelled" ?
                            <>
                                <Button onClick={onCancel} className="text-danger DeLink m-auto mb-1 mx-1">[Cancel]</Button>
                            </> : <></>
                        }
                    </> :
                    <></>
            }
        </div>
    </>
  )
}

export default Order