import { openModal } from './modal.js';

export const refreshTrack = (socket) => {
  const form = document.getElementById('track-form')
  form.style.display = "none"

  openModal(socket, 'track ended')
}