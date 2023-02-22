import { createSlice } from '@reduxjs/toolkit';

// Начальное значение
const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
  reducers: {
    addMessages: (state, action) => {
      state.messages.push(...action.payload);
    },
    addMessage: (state, action) => {
      const onlyId = state.messages.map((message) => message.id);
      if (!onlyId.includes(action.payload.id)) state.messages.push(action.payload);
    },
  },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { addMessages, addMessage } = messagesSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default messagesSlice.reducer;
