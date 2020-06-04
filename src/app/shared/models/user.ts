export class User {

  constructor(
    public id?: number,
    public name?: string,
    public contactNo?: string,
    public email?: string,
    public username?: string,
    public password?: string,
    public joiningdate?: Date,
    public isActive?: boolean) {
      this.id = id;
      this.name = name;
      this.contactNo = contactNo;
      this.email = email;
      this.username = username;
      this.password = password;
      this.joiningdate = joiningdate;
      this.isActive = isActive;
  }
}
