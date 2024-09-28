import { ref, onMounted, onUnmounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'

type MessageType = 'message' | 'entered_room' | 'left_room'
export function useWebSocket(url: string) {
  const ws = ref<WebSocket | null>(null)
  const messages = ref<string[]>([])
  const isConnected = ref(false)
  const name = ref<string>('')
  const uuid = uuidv4()

  const connect = () => {
    ws.value = new WebSocket(url)

    ws.value.onopen = () => {
      isConnected.value = true
      console.log('WebSocket connection opened')
    }

    ws.value.onmessage = (event) => {
      const data = JSON.parse(event.data)
      messages.value.push(data)
      console.log('Messages:', messages.value)
    }

    ws.value.onclose = () => {
      isConnected.value = false
      console.log('WebSocket connection closed')
    }

    ws.value.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
  }

  const sendMessage = (message: string, type: MessageType = 'message') => {
    if (ws.value && isConnected.value) {
      const messageString = JSON.stringify({
        id: uuid,
        name: name.value,
        content: message,
        createdAt: new Date(),
        type
      })
      ws.value.send(messageString)
    }
  }

  /**
   * Set's the name of the user and connects to the websocket.
   * Fires first message to broadcast to the channel that they have connected
   * @param newName string
   * @returns
   */
  const setNameAndConnect = (newName: string) => {
    name.value = newName

    sendMessage(name.value, 'entered_room')
  }

  onMounted(() => {
    connect()
  })

  onUnmounted(() => {
    sendMessage(name.value, 'left_room')
    if (ws.value) {
      ws.value.close()
    }
  })

  return {
    ws,
    messages,
    isConnected,
    uuid,
    setNameAndConnect,
    sendMessage
  }
}
