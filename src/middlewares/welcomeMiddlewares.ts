import { Request, Response, NextFunction } from 'express';

export const welcomeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const userAgent = req.headers['user-agent'];
  const welcomeMessage = '<p>¡Bienvenido a la TIENDA -X-!</p>';

  if (typeof userAgent === 'string' && /Mobi/i.test(userAgent)) {
    res.send('<p>¡Bienvenido a la TIENDA -X-! Por favor, rota tu dispositivo para una mejor experiencia de visualización.</p>');
  } else {
    res.send(welcomeMessage);
  }
};
