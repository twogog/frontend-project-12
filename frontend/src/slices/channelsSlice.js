/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// Начальное значение
const initialState = {
  channels: [],
  currentChannel: 1,
  modalId: null,
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
      const onlyId = state.channels.map((channel) => channel.id);
      if (onlyId.includes(action.payload.id)) state.channels.push(action.payload);
      state.currentChannel = action.payload.id;
    },
    addCurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
    removeChannel: (state, action) => {
      state.currentChannel = 1;
      state.channels = state.channels.filter((channel) => channel.id !== action.payload);
    },
    renameChannel: (state, action) => {
      const { id } = action.payload;
      state.channels = state.channels
        .map((channel) => (channel.id === id ? action.payload : channel));
    },
    idChannel: (state, action) => {
      state.modalId = action.payload;
    },
  },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const {
  renameChannel, idChannel, removeChannel, addChannels, addChannel, addCurrentChannel,
} = channelsSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default channelsSlice.reducer;
