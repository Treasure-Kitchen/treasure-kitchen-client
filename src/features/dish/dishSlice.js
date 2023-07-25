import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dishes: []
}

export const dishSlice = createSlice({
    name: 'dishes',
    initialState,
    reducers: {
        addDish: (state, action) => {
            state.dishes.push(action.payload);
        },
        removeDish: (state, action) => {
            const index = state.dishes.indexOf(action.payload);
            if(index > -1){
                state.dishes.splice(index, 1);
            }
        },
        clearDishes: (state) => {
            state.dishes.length = 0;
        }
    }
});

export const { addDish, clearDishes, removeDish } = dishSlice.actions;
export default dishSlice.reducer;