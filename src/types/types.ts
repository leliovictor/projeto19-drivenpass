export type Auth = {
  email: string;
  password: string;
};

export type Credential = {
  userId: number,
  title: string,
  url: string,
  username: string,
  password: string,
};

export type FindCredential = {
  userId: number,
  credentialId: string
}
