import jwt from 'jsonwebtoken';
import { decodeToken } from "../utils/bcrypt.js"


export default async function jwtUserAuth (req, res, next) {
  const { authorization  } = req.headers 
  if (!authorization ) return res.status(401).json({ error: 'Missing Authorization' })

  const token = authorization .split(' ')[1]
  if (!token) {
    return res.status(401).json({ error: 'Token is required.' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, tokenDecoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token.' });
    }

    const { authorId, id, email } = req.body
    // Adicione o usuário decodificado à solicitação
    const user = tokenDecoded;
    const reqUserId = authorId || id
    if(user.email === email && reqUserId === user.id) {
      next();
      return
    }

    return res.status(403).send()
  })
}