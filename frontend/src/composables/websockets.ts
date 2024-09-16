import { ref, onMounted, onUnmounted } from 'vue'

export function useWebSocket(url: string) {
  const ws = ref<WebSocket | null>(null)
  const messages = ref<string[]>([])
  const isConnected = ref(false)
  const name = ref<string>('')

  const connect = () => {
    ws.value = new WebSocket(url)

    ws.value.onopen = () => {
      isConnected.value = true
      console.log('WebSocket connection opened')
    }

    ws.value.onmessage = (event) => {
      const data = JSON.parse(event.data)
      messages.value.push(data)
    }

    ws.value.onclose = () => {
      isConnected.value = false
      console.log('WebSocket connection closed')
    }

    ws.value.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
  }

  const sendMessage = (message: string) => {
    if (ws.value && isConnected.value) {
      const messageString = JSON.stringify({
        name: name.value,
        content: message,
        createdAt: new Date()
      })
      ws.value.send(messageString)
    }
  }

  const setName = (newName: string) => (name.value = newName)

  onMounted(() => {
    connect()
  })

  onUnmounted(() => {
    if (ws.value) {
      ws.value.close()
    }
  })

  return {
    ws,
    messages,
    isConnected,
    sendMessage,
    setName
  }
}
