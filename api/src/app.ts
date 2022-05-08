// import express from 'express';

import express, { Response, Request, json, urlencoded } from 'express';
import { AdminRoute, CustomerRoute, DeliveryRoute, ShoppingRoute, VandorRoute } from './routes';

const app = express();
app.use(json());
app.use(urlencoded()); //Parse URL-encoded bodies

app.get('/', (req: Request, res: Response) => {
  return res.send({ response: 'I am alive' }).status(200);
});

// app.use(json);
// app.use(urlencoded());

app.use('/admin', AdminRoute);
app.use('/vendor', VandorRoute);
// app.use('/customer', CustomerRoute);
// app.use('/delivery', DeliveryRoute);
// app.use(ShoppingRoute);

export default app;
