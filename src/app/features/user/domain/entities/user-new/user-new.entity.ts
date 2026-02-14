export interface UserNewEntity {
    firstName: string;
    lastName: string;
    gender: string;
    address: UserNewAddressEntity;
}

export interface UserNewAddressEntity {
  cep: string;
  state: string;
  street: string;
  neighborhood: string;
  number: string;
  complement: string;
}