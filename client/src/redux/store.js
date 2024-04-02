import {configureStore} from "@reduxjs/toolkit"

import rootReducer from "./slices/personSlice"
import todoSlice from "./slices/todoSlice"



export default configureStore({reducer:{person: rootReducer, task:todoSlice}})