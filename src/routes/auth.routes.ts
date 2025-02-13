import { Router } from "express";

const route = Router();


route.get("/signup", (req, res) => {
    res.send("Login");
});


export default route;