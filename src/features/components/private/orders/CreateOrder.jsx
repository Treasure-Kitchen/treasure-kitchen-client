import Multiselect from "multiselect-react-dropdown"
import { useState } from "react"

const CreateOrder = () => {
    const [orders, setOrders] = useState([]);
    const options = [
        { id: "1", name: "Rice and Beans"}, 
        { id: "2", name: 'Amala and Ewedu'}, 
        { id: "3", name: 'Semo and vegetable'}
    ]

    console.log(orders)
    const slt = [
        { id: "3", name: 'Semo and vegetable'}
    ]

    const setSelected = (e) => {
        let ordersArr = [];
        e.forEach((order) => ordersArr.push(order?.id));
        setOrders(ordersArr)
    }

    const style = {
        chips: {
          background: "#583010"
        },
        searchBox: {
          border: "none",
          "border-bottom": "1px solid #583010",
          "border-radius": "0px"
        },
        multiselectContainer: {
          color: "#583010",
        }
      };

  return (
    <div className="" style={{top: '50%', left: '0', right: '0', position: 'absolute'}}>
        <Multiselect
            options={options}
            displayValue="name"
            selectedValues={slt}
            showCheckbox={true}
            onSelect={setSelected}
            onRemove={setSelected}
            id="css_custom"
            style={style}
        />
    </div>
  )
}

export default CreateOrder