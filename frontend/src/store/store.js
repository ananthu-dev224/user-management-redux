import {configureStore} from '@reduxjs/toolkit'

import userSlice from '../app/userSlice'
import adminSlice from '../app/adminSlice'

const store = configureStore({
    reducer:{
        admin:adminSlice,
        user:userSlice
    }
})



export default store;