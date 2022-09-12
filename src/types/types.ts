import { User, Credential, Note, Card, Network } from "@prisma/client";

export type Auth = Omit<User, 'id'>;

export type CredentialParams = Omit<Credential, 'id'>;

export type FindCredential = {
  userId: number,
  credentialId: string
};

export type NoteParams = Omit<Note, 'id'>;

export type FindNote = {
  userId: number,
  noteId: string
};

export type CreateCardParams = Omit<Card, 'id'>;

export type CardParams = Omit<CreateCardParams, 'userId'>;

export type FindCardParams = Pick<Card, 'id' | 'userId'>;

export type CreateNetworkParams = Omit<Network, 'id'>;

export type FindNetworkParams = Pick<Network, 'id' | 'userId'>;
