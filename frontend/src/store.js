import { create } from 'zustand'

export const useDownloadStore = create((set) => ({
  videoInfo: null,
  downloadHistory: JSON.parse(localStorage.getItem('downloadHistory')) || [],
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  
  setVideoInfo: (info) => set({ videoInfo: info }),
  
  addToHistory: (download) => set((state) => {
    const updated = [download, ...state.downloadHistory].slice(0, 50)
    localStorage.setItem('downloadHistory', JSON.stringify(updated))
    return { downloadHistory: updated }
  }),
  
  addFavorite: (video) => set((state) => {
    const updated = [...state.favorites, video]
    localStorage.setItem('favorites', JSON.stringify(updated))
    return { favorites: updated }
  }),
  
  removeFavorite: (videoId) => set((state) => {
    const updated = state.favorites.filter(v => v.id !== videoId)
    localStorage.setItem('favorites', JSON.stringify(updated))
    return { favorites: updated }
  }),
  
  clearHistory: () => {
    localStorage.removeItem('downloadHistory')
    set({ downloadHistory: [] })
  }
}))
