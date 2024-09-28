declare global {
  interface Message {
    id: string
    text: string
    createdAt: string
    type: 'message' | 'entered_room' | 'left_room'
  }
}

export {}
