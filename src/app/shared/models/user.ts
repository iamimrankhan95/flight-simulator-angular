export class User {

  constructor(
    public id?: number,
    public name?: string,
    public contactNo?: string,
    public email?: string,
    public username?: string,
    public password?: string,
    public joiningDate?: Date,
    public isActive?: number) {
      this.id = id;
      this.name = name;
      this.contactNo = contactNo;
      this.email = email;
      this.username = username;
      this.password = password;
      this.joiningDate = joiningDate;
      this.isActive = isActive;
  }
}
