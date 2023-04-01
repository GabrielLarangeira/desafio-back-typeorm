export interface IContactRequest {
  fullName: string;
  email: string;
  phone: string;
}

export interface IContactResponse {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  createdAt: string;
  userId: string;
}

export interface IContactUpdateRequest {
  fullName?: string;
  email?: string;
  phone?: string;
}