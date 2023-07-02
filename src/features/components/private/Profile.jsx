import React from 'react'
import { useGetUserWithCookieQuery } from '../../api/userApi'

const Profile = () => {
    const userId = document.cookie.replace(/(?:(?:^|.*;\s*)profile\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const { data: profile } = useGetUserWithCookieQuery(userId);
    
  return (
    <div>Profile</div>
  )
}

export default Profile