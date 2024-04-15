import { createSlice } from '@reduxjs/toolkit'



const INITIAL_STATE = {
    users: [],
    isLoading: false,
    error: false,
    success: false
}


const adminSlice = createSlice({
    name: 'admin',
    initialState: INITIAL_STATE,
    reducers: {
        fetchUsers(state, action) {
            state.users = action.payload;
        },
        addUserState(state, action) {
            state.users.push(action.payload);
        },
        editUserState(state, action) {
            const { id, ...updatedUserData } = action.payload;
            const index = state.users.findIndex(user => user.id === id);
            if (index !== -1) {
                state.users[index] = { ...state.users[index], ...updatedUserData };
            }
        },
        deleteUserState(state, action) {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        searchState(state, action) {
            const { prefix } = action.payload;
            if (prefix === '') {
                state.users = [...state.users];
            } else {
                const regex = new RegExp(`^${prefix}`, "i");
                state.users = state.users.filter(user => regex.test(user.username));
            }
        }
    }

})

export const {
    fetchUsers,
    addUserState,
    editUserState,
    deleteUserState,
    searchState
} = adminSlice.actions;


export default adminSlice.reducer;