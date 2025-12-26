export interface AddUserRequest {
  email: string; // required, must be a valid email
  firstname: string; // required
  lastname: string; // required
  profile_pic?: File; // optional
  is_coowner?: boolean; // optional
  membership?: MembershipRequest[]; // optional
}

export interface MembershipRequest {
  workspace_id: string;
  role: string;
  bases?: BaseMembership[];
}

export interface BaseMembership {
  base_id: string;
  role: string;
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
