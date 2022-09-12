import Cryptr from "cryptr";

import { Credential, FindCredential } from "../types/types.js";
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

export async function findCredentialById(id: number) {
    const credential = await repository.findById(id);

    if(!credential) {
        throw new AppError(
            404,
            "Credential not found",
            "Ensure to provide a valid id"
        );
    }

    return credential;

}

function validUser(tokenUserId: number, credentialUserId: number) {
    if(tokenUserId !== credentialUserId) {
        throw new AppError(
            409,
            "Unauthorized user",
            "Ensure to provide a valid user"
        );
    }
} 

export async function getCredentialById(data: FindCredential) {
    const credential = await findCredentialById(+data.credentialId);
    validUser(data.userId, credential.userId);

    credential.password = cryptr.decrypt(credential.password);
    delete credential.userId;

    return credential;
}

export async function getUserCredentials(userId: number) {
    const userCredentials = await repository.findManyByUserId(userId);

    userCredentials.forEach(credential => {delete credential.userId});
    
    userCredentials.forEach(credential => credential.password = cryptr.decrypt(credential.password));

    return userCredentials;
}

export async function deleteCredential(data: FindCredential) {
    const credential = await findCredentialById(+data.credentialId);
    validUser(data.userId, credential.userId);

    await repository.deleteById(+data.credentialId);
}