import { create } from 'zustand'

// localStorage is writable by anything running on this origin, so treat its
// contents as untrusted: bad JSON or a non-array value must not crash the app.
const readList = (key) => {
  try {
    const parsed = JSON.parse(localStorage.getItem(key))
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const useDownloadStore = create((set) => ({
  videoInfo: null,
  downloadHistory: readList('downloadHistory'),
  favorites: readList('favorites'),

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
