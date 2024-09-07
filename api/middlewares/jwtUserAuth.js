import jwt from 'jsonwebtoken';


export default async function jwtUserAuth (req, res, next) {
  const { authorization } = req.headers 
  if (!authorization ) return res.status(401).json({ error: 'Missing Authorization' })

  const token = authorization .split(' ')[1]
  if (!token) {
    return res.status(401).json({ error: 'Token is required.' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, tokenDecoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token.' });
    }

    const data = Object.keys(req.body).length > 0 ? req.body : req.query
    const { authorId, id, userId, email } = data
    const user = tokenDecoded;
    const reqUserId = userId || authorId || id
    if(user.email === email && parseInt(reqUserId) === user.id) {
      next();
      return
    }

    return res.status(403).send()
  })
}