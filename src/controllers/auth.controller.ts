import { Request, Response } from "express";

import * as service from "../services/auth.service.js";

export async function postSignup(_req: Request, res: Response) {
    const { body } = res.locals;
    
    await service.createUser(body);

    return res.sendStatus(201);
}


export async function postLogin(_req: Request, res: Response) {
    //checa se email existe no banco de dados
    //salva userId no jsow e retorna para usuario json


    return res.sendStatus(200);
}