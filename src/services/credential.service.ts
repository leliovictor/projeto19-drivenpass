import Cryptr from "cryptr";

import { Credential } from "../types/types.js";
import { AppError } from "../middlewares/error.handler.middleware.js";

import * as repository from "../repositories/credential.repository.js";

const cryptr = new Cryptr(process.env.CRYPTR);

async function checkTitleDuplicate(data:Omit<Credential, "username" | "password" | "url">) {
    const credential = await repository.findFirstByTitleUserId(data);

    if (credential) {
        throw new AppError(
            409,
            "Title already in use",
            "Ensure to provide a unique title per user"
        );
    } 
}


export async function createCredential(data: Credential) {
    await checkTitleDuplicate({userId:data.userId, title:data.title});

    const passwordCript = cryptr.encrypt(data.password);
    
    await repository.registerCredential({ ...data, password: passwordCript});

}