#!/usr/bin/env node
import server from './app.js' // load up the web server
const port = 5000 // the port to listen to for incoming requests
// call express's listen function to start listening to the port
const listener = server.listen(port, function () {
  console.log(`Server running on port: ${port}`)
})
// a function to stop listening to the port
const close = () => {
  listener.close()
}

// export the close function
export { close }