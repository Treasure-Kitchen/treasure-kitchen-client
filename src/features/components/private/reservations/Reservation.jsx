import { numberToTime, shortDateTime, shortLocalTime } from '../../../../settings/helpers';
import { orderStatus } from '../../../../settings/settings';
import { Badge, Button } from 'react-bootstrap';
import { useCancelReservationMutation, useConfirmReservationMutation } from '../../../api/reservationApi';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const Reservation = ({reservation}) => {
  const [
          cancelReservation, 
          { data: cancelData, 
          isSuccess: isCancelSuccess, 
          isError: isCancelError, 
          error: cancelError }
        ] = useCancelReservationMutation();

  useEffect(() => {
    if(isCancelError){
      toast.error(cancelError?.data?.message)
    }

    if(isCancelSuccess || cancelData){
      toast.success(cancelData?.message)
    }
  }, [isCancelError, cancelData, cancelError, isCancelSuccess])

  const [
    confirmReservation, 
    { data: confirmData, 
    isSuccess: isConfirmSuccess, 
    isError: isConfirmError, 
    error: confirmError }
  ] = useConfirmReservationMutation();

  useEffect(() => {
    if(isConfirmError){
      toast.error(confirmError?.data?.message)
    }

  if(isConfirmSuccess || confirmData){
    toast.success(confirmData?.message)
  }
}, [isConfirmError, confirmData, isConfirmSuccess, confirmError])

  const handleCancellation = async (e) => {
    e.preventDefault();
    await cancelReservation(reservation?._id);
  }

  const handleConfirmation = async (e) => {
    e.preventDefault();
    await confirmReservation(reservation?._id);
  }

  return (
    <>
      <p>
          <span className="fw-bold">Scheduled Date: </span><span className="FloatRight">{shortDateTime(reservation?.dateTime)}</span>
      </p>
      <p>
          <span className="fw-bold">Scheduled Time: </span><span className="FloatRight">{shortLocalTime(reservation?.dateTime)}</span>
      </p>
      <p>
          <span className="fw-bold">Duration: </span><span className="FloatRight">{numberToTime(reservation?.duration)}</span>
      </p>
      <p>
          <span className="fw-bold">Table#: </span><span className="FloatRight">{reservation?.table?.number}</span>
      </p>
      <p className='mb-0'>
          <span className="fw-bold">Party Size: </span><span className="FloatRight">{reservation?.partySize}</span>
      </p>
      {
          reservation?.status === "Pending" ? 
          <>
            <span className='d-flex justify-content-end mb-1 align-items-center'>
              <Button onClick={handleCancellation} className='text-danger ButtonToLink px-2 fw-bold'>Cancel</Button>
              <Button onClick={handleConfirmation} className='ButtonToLinkNoColor DarkGreen fw-bold'>Confirm</Button>
            </span>
          </> :
          <></>
        }
      <span className="d-flex justify-content-end align-items-center">
          <Badge className='p-2' bg={`${orderStatus[reservation?.status]}`}>{reservation?.status}</Badge>
      </span>
    </>
  )
}

export default Reservation