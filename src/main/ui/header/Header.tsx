import React from 'react'
import {NavLink} from 'react-router-dom'
import {PATH} from '../routes/routes'

export const Header = () => {
  return (
    <div>
      <NavLink to={PATH.LOGIN}>Login</NavLink>
      <NavLink to={PATH.REGISTER}>Register</NavLink>
      <NavLink to={PATH.PROFILE}>Profile</NavLink>
      <NavLink to={PATH.NOT_FOUND}>404</NavLink>
      <NavLink to={PATH.PASSWORD_RECOVERY}>Password recovery</NavLink>
      <NavLink to={PATH.NEW_PASSWORD}>New password</NavLink>
      <NavLink to={PATH.TEST_PAGE}>Test</NavLink>
    </div>
  )
}