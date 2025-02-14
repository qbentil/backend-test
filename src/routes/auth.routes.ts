import { Login, Signup } from "../controllers";

import { Router } from "express";
import { UserValidation } from "../validations";
import { ValidationMiddleware } from "../middlewares";

const route = Router();

route.post("/signup", ValidationMiddleware(UserValidation.new), Signup);

route.post("/login", ValidationMiddleware(UserValidation.login), Login);

export default route;
