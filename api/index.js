import server from './server.js'
import './config/dotenv.js'

const port = process.env.PORT

server.listen(port, () => console.log(`API started on port ${port}`))