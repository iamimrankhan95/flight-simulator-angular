export class User {

  constructor(public usernameOrEmail?: string,
    public password?: string) {
    this.usernameOrEmail = usernameOrEmail;
    this.password = password;
  }
}
