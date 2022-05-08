// import express from 'express';

import express, { Response, Request, json, urlencoded } from 'express';
import { AdminRoute, CustomerRoute, DeliveryRoute, ShoppingRoute, VandorRoute } from './routes';

const app = express();
app.use(json);
app.use(urlencoded());

app.use('/admin', AdminRoute);
app.use('/vendor', VandorRoute);
// app.use('/customer', CustomerRoute);
// app.use('/delivery', DeliveryRoute);
// app.use(ShoppingRoute);

app.get('/', (req: Request, res: Response) => {
  res.send({ response: 'I am alive' }).status(200);
});

export default app;
