import { createSlice } from "@reduxjs/toolkit";


const requestSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        addRequests: (state, action) => action.payload,
        removeRequest: (state: any, action) => {
            const newArray = state.filter((r: any) => r._id !== action.payload)
            return newArray
        },
        clearRequests: () => {
            return null
        }
    }
})

export const { addRequests, removeRequest, clearRequests } = requestSlice.actions
export default requestSlice.reducer