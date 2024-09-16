import { Server } from "http"
import { WebSocketServer } from "ws"

export function setupWebSocket(server: Server) {
  console.log("Setting up WebSocket server")
  const wss = new WebSocketServer({ server })

  wss.on("connection", (ws) => {
    ws.on("error", (error) => console.log("WebSocket error:", error))
    ws.on("message", (message) => {
      console.log("Received message:", message)
      // wss.clients.forEach((client) => {
      //   if (client.readyState === 1) {
      //     client.send(message)
      //   }
      // })
    })
    ws.on("close", () => {
      console.log("Client disconnected")
    })
  })
}
