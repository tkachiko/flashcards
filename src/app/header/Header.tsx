import React from 'react'

import { NavLink } from 'react-router-dom'

import styleContainer from '../../common/styles/Container.module.css'
import { PATH } from '../routes/routes'

import style from './Header.module.css'

export const Header = () => {
  return (
    <nav className={style.headerNav}>
      <ul className={`${style.navList} ${styleContainer.container}`}>
        <li className={style.navItem}>
          <NavLink
            to={PATH.LOGIN}
            className={({ isActive }) => (isActive ? style.activeLink : style.link)}
          >
            Login
          </NavLink>
        </li>
        <li className={style.navItem}>
          <NavLink
            to={PATH.REGISTER}
            className={({ isActive }) => (isActive ? style.activeLink : style.link)}
          >
            Register
          </NavLink>
        </li>
        <li className={style.navItem}>
          <NavLink
            to={PATH.PROFILE}
            className={({ isActive }) => (isActive ? style.activeLink : style.link)}
          >
            Profile
          </NavLink>
        </li>
        <li className={style.navItem}>
          <NavLink
            to={PATH.NOT_FOUND}
            className={({ isActive }) => (isActive ? style.activeLink : style.link)}
          >
            404
          </NavLink>
        </li>
        <li className={style.navItem}>
          <NavLink
            to={PATH.PASSWORD_RECOVERY}
            className={({ isActive }) => (isActive ? style.activeLink : style.link)}
          >
            Password recovery
          </NavLink>
        </li>
        <li className={style.navItem}>
          <NavLink
            to={PATH.NEW_PASSWORD}
            className={({ isActive }) => (isActive ? style.activeLink : style.link)}
          >
            New password
          </NavLink>
        </li>
        <li className={style.navItem}>
          <NavLink
            to={PATH.TEST_PAGE}
            className={({ isActive }) => (isActive ? style.activeLink : style.link)}
          >
            Test
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
