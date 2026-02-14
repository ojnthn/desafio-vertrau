import { UserEntity } from "../../../domain/entities/user/user.entity";

export class UserModel {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public gender: string,
    public cep: string,
    public state: string,
    public street: string,
    public neighborhood: string,
    public number: string,
    public complement: string
  ) {}

  toEntity(): UserEntity {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
      address: {
        cep: this.cep,
        state: this.state,
        street: this.street,
        neighborhood: this.neighborhood,
        number: this.number,
        complement: this.complement,
      }
    }
  }
}
