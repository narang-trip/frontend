import { configureStore } from "@reduxjs/toolkit"

import authReducer from './auth-slice'
import tripReducer from './trip-slice'

const store = configureStore({
  reducer: {auth : authReducer, trip: tripReducer}
})
  
export default store;