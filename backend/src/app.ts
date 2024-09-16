import express, { Request } from "express"
import { WebSocketServer, WebSocket } from "ws"
import routes from "./routes/routes"

const app = express()

routes(app)

const server = app.listen(3000, () => {
  // Create WebSocket server
  console.log("Server running on http://localhost:3000")
})

const wss = new WebSocketServer({ noServer: true }) // Could also attach to an existing server

const onSocketPreError = (error: Error) =>
  console.log("WebSocket Pre-error:", error)
const onSocketPostError = (error: Error) =>
  console.log("WebSocket Post-error:", error)

server.on("upgrade", (request, socket, head) => {
  console.log("WebSocket upgrade request")
  // Before connection is established
  socket.on("error", onSocketPreError)

  // This can be used for authentication
  if (!!request.headers["BadAuth"]) {
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n")
    socket.destroy()
    return
  }
  wss.handleUpgrade(request, socket, head, (ws) => {
    // After connection is established
    ws.on("error", onSocketPreError)
    wss.emit("connection", ws, request)
  })
})

wss.on("connection", (ws: WebSocket, request: Request) => {
  ws.on("error", onSocketPostError)
  ws.on("message", (message, isBinary: Boolean) => {
    // Convert message to string
    const msg = message.toString()
    let parsedMessage
    try {
      parsedMessage = JSON.parse(msg)
    } catch (error) {
      console.error("Error parsing message:", error)
      return
    }
    console.log("Received message:", msg)
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(parsedMessage))
      }
    })
  })
  ws.on("close", () => {
    console.log("Client disconnected")
  })
})

interface Message {
  id?: string
  message: string
  createdAt: Date
}
