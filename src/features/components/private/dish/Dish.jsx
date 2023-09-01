import { currencies } from '../../../../settings/settings'
import { formatMoneyTo2DP } from '../../../../settings/helpers'

const Dish = ({dish}) => {
  return (
    <>
        <img src={`${dish?.photo}`} alt={`${dish?.name}`} className='DishImageH'/>
        <p className="pt-2">
            <span className="fw-bold">{dish?.name}</span>
            <span className="FloatRight">{currencies.Naira}{formatMoneyTo2DP(dish?.price)}</span>
        </p>
        <p className='content'>{dish?.description}</p>
    </>
  )
}

export default Dish