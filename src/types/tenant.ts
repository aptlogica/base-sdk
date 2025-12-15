export interface AddUserRequest {
  email: string; // required, must be a valid email
  firstname: string; // required
  lastname: string; // required
}

export interface UserIDPayload {
  user_id: string; // required
}

export interface UpdateTenant {
  name: string;
}

// Update the type definition (wherever your types are defined)
export interface DeactivateUserPayload {
  user_id: string;
}
