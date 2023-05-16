import jwt from 'jsonwebtoken';

export default async  function authMiddleware(ctx, next) {
  try {
    const token = ctx.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;
    ctx.state.auth = {
      userId: userId
    };
    await next();
  } catch(error) {
    ctx.throw(401, 'Utilisateur non authentifié');
  }
}
