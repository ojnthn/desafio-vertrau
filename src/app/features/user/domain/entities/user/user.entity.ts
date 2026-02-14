export interface UserEntity {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    address: UserAddressEntity;
}

export interface UserAddressEntity {
  cep: string;
  state: string;
  street: string;
  neighborhood: string;
  number: string;
  complement: string;
}