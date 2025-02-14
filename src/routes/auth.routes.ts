import { login, signup } from "../services";

import { Router } from "express";
import { UserValidation } from "../validations";
import { ValidationMiddleware } from "../middlewares";

const route = Router();


route.post(
    "/signup", 
    ValidationMiddleware(UserValidation.new),
    signup
);

route.post(
    "/login", 
    ValidationMiddleware(UserValidation.login),
    login
);


export default route;