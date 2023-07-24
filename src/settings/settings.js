export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,200}$/;
export const DUMMY_USER_PHOTO = 'https://th.bing.com/th/id/OIP.qWxWnrBHWhc8nexK2HjpdwAAAA?pid=ImgDet&rs=1';
export const COVER_IMAGE = 'https://res.cloudinary.com/otrprojs/image/upload/v1687569662/page-common-bg_jiy1g2.jpg';
export const BASE_URL = 'http://localhost:5500/api';
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
  Naira: 'NGN',
  Dollars: 'USD',
  Euro: 'EUR',
  Pound: 'BPD'
}