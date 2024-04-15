import { createSlice } from '@reduxjs/toolkit'


const INITIAL_STATE = {
    profile: null,
    profileImg: null,
    isLoading: false,
    error: false,
    success: false
}


const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        pfpChange: (state, action) => {
            state.profileImg = action.payload
        },
        fetchProfile: (state, action) => {
            state.profile = action.payload
        }
    }
})

export const {
    pfpChange,
    fetchProfile
} = userSlice.actions;





export default userSlice.reducer;