import { Router } from 'express';

const route = Router();

route.get('/new', (req, res) => {
  res.send('New');
});

export default route;
