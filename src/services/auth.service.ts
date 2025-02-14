import { NextFunction, Request, Response } from "express";

import { ResponseHandler } from "../handers";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        // const user = await AuthService.signup(email, password);
        new ResponseHandler(res).successWithData({ email, password });
    } catch (error) {
        return next(error);
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        // const user = await AuthService.login(email, password);
        new ResponseHandler(res).successWithData({ email, password });
    } catch (error) {
        return next(error);
    }
}