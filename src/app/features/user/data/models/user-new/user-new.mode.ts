import { UserNewEntity } from "../../../domain/entities/user-new/user-new.entity";

export class UserNewModel {
  constructor(
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

  static fromEntity(entity: UserNewEntity): UserNewModel {
    return new UserNewModel(
      entity.firstName,
      entity.lastName,
      entity.gender,
      entity.address.cep,
      entity.address.state,
      entity.address.street,
      entity.address.neighborhood,
      entity.address.number,
      entity.address.complement
    );
  }
}
