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

  static toEntity(model: UserModel): UserEntity {
    return {
      id: model.id,
      firstName: model.firstName,
      lastName: model.lastName,
      gender: model.gender,
      address: {
        cep: model.cep,
        state: model.state,
        street: model.street,
        neighborhood: model.neighborhood,
        number: model.number,
        complement: model.complement,
      },
    };
  }
}
