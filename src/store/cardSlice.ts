import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CardItem = {
  id: number;
  title: string;
  quantity: number;
  price: number;
};

type CardState = {
  items: Record<number, CardItem>;
};

const initialState: CardState = {
  items: {},
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addItem(
      state,
      action: PayloadAction<{ id: number; title: string; price: number }>
    ) {
      const { id, title, price } = action.payload;
      if (state.items[id]) {
        state.items[id].quantity += 1;
      } else {
        state.items[id] = { id, title, price, quantity: 1 };
      }
    },
    increment(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id].quantity += 1;
      }
    },
    decrement(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.items[id]) {
        if (state.items[id].quantity === 1) {
          delete state.items[id];
        } else {
          state.items[id].quantity -= 1;
        }
      }
    },
    setCard(state, action: PayloadAction<CardState>) {
      state.items = action.payload.items;
    },
    clearCard(state) {
      state.items = {};
    },
  },
});

export const { addItem, increment, decrement, setCard, clearCard } =
  cardSlice.actions;
export default cardSlice.reducer;
