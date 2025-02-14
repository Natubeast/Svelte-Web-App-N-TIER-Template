import { AuthenticationModel } from '$lib/models/authentication_model';
import { AuthenticationDataProvider } from '../data_providers/authentication_data_provider';
export class AuthenticationRepository {
  constructor(private authDataProvider: AuthenticationDataProvider) { }

  async login(username: string, password: string): Promise<{ success: boolean; authModel?: AuthenticationModel; error?: string }> {
    try {
      const authData = await this.authDataProvider.login(username, password);
      if (!authData.result) {
        return { success: false, error: authData.error };
      }
      const authModel = AuthenticationModel.fromMap(new Map(Object.entries(authData.data!)));
      return { success: authData.result, authModel };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async refreshToken(token: string): Promise<{ success: boolean; authModel?: AuthenticationModel; error?: string }> {
    try {
      const authData = await this.authDataProvider.refreshToken(token);
      if (!authData.result) {
        return { success: false, error: authData.error };
      }
      const authModel = AuthenticationModel.fromMap(new Map(Object.entries(authData.data!)));
      return { success: authData.result, authModel };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

}


