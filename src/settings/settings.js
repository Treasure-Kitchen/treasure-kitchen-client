export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,200}$/;
export const DUMMY_USER_PHOTO = 'https://th.bing.com/th/id/OIP.qWxWnrBHWhc8nexK2HjpdwAAAA?pid=ImgDet&rs=1';
export const COVER_IMAGE = 'https://res.cloudinary.com/otrprojs/image/upload/v1687569662/page-common-bg_jiy1g2.jpg';
export const FLOWER_IMAGE = 'https://res.cloudinary.com/otrprojs/image/upload/v1690585998/pexels-lumn-295771_uwgzzi.jpg';
export const FLOWER_IMAGE2 = 'https://res.cloudinary.com/otrprojs/image/upload/v1690574423/pexels-karolina-grabowska-4466492_pmopzk.jpg';
export const BASE_URL = 'https://treasure-kitchen-server.onrender.com/api';
export const USER_AUTH_BASE_URL = 'http://localhost:5500';
export const MULTI_SELECT_STYLE = {
    chips: {
      background: "#583010"
    },
    searchBox: {
      "border": "none",
      "borderBottom": "1px solid #583010",
      "borderRadius": "0px"
    },
    multiselectContainer: {
      color: "#583010",
    }
};

export const colors = {
  Gold: '#FFD700',
  Grey: '#808080'
}

export const COUNTRIES = [
  {id: 1, name: 'Azerbaijan'}, 
  {id: 2, name: 'Canada'}, 
  {id: 3, name: 'Nigeria'}, 
  {id: 4, name: 'United States of America'}
]

export const STATES = [
  {id: 1, name: 'Abia'}, 
  {id: 2, name: 'Bayelsa'}, 
  {id: 3, name: 'Kwara'}, 
  {id: 4, name: 'Kaduna'},
  {id: 5, name: 'Lagos'},
  {id:6, name: 'Federal Capital Territory'}
]

export const currencies = {
  Naira: '₦',
  Dollars: '$',
  Euro: '€',
  Pound: '£'
}

export const numbers = {
  One: 1,
  Two: 2,
  Three: 3,
  Four: 4,
  Five: 5,
  Six: 6,
  Seven: 7,
  Eight: 8,
  Nine: 9,
  Zero: 0
}

export const monthsInts = ["Select Month", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

export const yearsInts = () => {
  const startYear = new Date().getFullYear();
    const endYear = startYear + numbers.Nine;
    const result = ["Select Year"];
    for(let i = startYear; i <= endYear; i++){
        const value = i.toString().substring(2);
        result.push(value);
    }
    return result;
}

export const roles = {
  User: 2004,
  Regular: 2003,
  Admin: 2002,
  SuperAdmin: 2001
}

export const orderStatus = {
  Pending: "secondary",
  Placed: "warning",
  Cancelled: "danger",
  Confirmed: "primary",
  Completed: "success"
}

export const paymentStatus = {
  "Paid": "success",
  "Not Yet Paid": "secondary",
  "Partial": "info",
  "Over Paid": "danger"
}