import { UserModel } from "./user_model";

export class AuthenticationModel {
    public token: string;
    public expiresAt: Date;
    public authenticatedUser: UserModel
  
    private constructor(token: string, expiresAt: Date, authenticatedUser: UserModel) {
      this.token = token;
      this.expiresAt = expiresAt;
      this.authenticatedUser = authenticatedUser;

      if (!this.token || !this.token) {
        throw new Error('Missing required properties for AuthenticationModel');
      }
    }
  
    public static fromMap(authData: Map<string, unknown>): AuthenticationModel {
      const token = authData.get('token') as string;
      const expiresAt = new Date(authData.get('expires_at') as string);
      const authenticatedUser = UserModel.fromMap(authData);
  
      return new AuthenticationModel(token, expiresAt, authenticatedUser);
    }
  }
  