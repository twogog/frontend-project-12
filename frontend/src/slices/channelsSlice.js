import { createSlice } from '@reduxjs/toolkit';

// Начальное значение
const initialState = {
  channels: [],
  currentChannel: 1,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
  reducers: {
    addChannels: (state, action) => {
      state.channels.push(...action.payload);
    },
    addCurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
  },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { addChannels, addCurrentChannel } = channelsSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default channelsSlice.reducer;
