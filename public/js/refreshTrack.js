import { openModal } from './modal.js';

export const refreshTrack = (socket) => {
  openModal(socket, 'track ended')
}