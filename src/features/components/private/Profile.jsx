import React from 'react'
import { useGetUserWithCookieQuery } from '../../api/userApi'

const Profile = () => {
    const { data: profile } = useGetUserWithCookieQuery();
    console.log(profile);
    
  return (
    <div>Profile</div>
  )
}

export default Profile