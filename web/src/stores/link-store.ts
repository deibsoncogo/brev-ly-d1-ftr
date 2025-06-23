import { create } from "zustand"

interface Link {
  id: string
  originalLink: string
  shortLink: string
  accesses: number
  createdAt: string
}

type LinkStore = {
  links: Link[]
  setLinks: (links: Link[]) => void
  addLink: (link: Link) => void
  removeLink: (id: string) => void
}

export const useLinkStore = create<LinkStore>(set => ({
  links: [],

  setLinks: links => {
    set({ links })
  },

  addLink: link => {
    set(state => ({ links: [link, ...state.links] }))
  },

  removeLink: id => {
    set(state => ({ links: state.links.filter(link => link.id !== id) }))
  },
}))
