import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { authReducer } from '../features/auth/login/auth-reducer'
import { registerReducer } from '../features/auth/register/register-reducer'
import { passwordReducer } from '../features/password/password-reducer'
import { profileReducer } from '../features/profile/profile-reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  password: passwordReducer,
  profile: profileReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type RootStateType = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store
