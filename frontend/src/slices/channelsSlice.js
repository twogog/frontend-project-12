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
      const onlyId = state.channels.map((channel) => channel.id);
      const filtered = action.payload.filter((channel) => !onlyId.includes(channel.id));
      state.channels.push(...filtered);
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    addCurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
  },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { addChannels, addChannel, addCurrentChannel } = channelsSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default channelsSlice.reducer;
