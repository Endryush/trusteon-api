import './config/dotenv.js'
import server from './server.js'

const port = process.env.PORT

server.listen(port, () => console.log(`API started on port ${port}`))