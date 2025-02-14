import { describe, it, expect, vi, beforeEach, type Mocked } from 'vitest';
import {AuthenticationRepository} from '../../lib/repositories/authentication_repository';
import {AuthenticationDataProvider} from '../../lib/data_providers/authentication_data_provider';

import { UserModel } from '../../lib/models/user_model';

// Import the JSON data
import loginResponse from '../data/data_provider_responses/auth_data_provider_login_response.json';
import { authState } from '$lib/stores/state_store';
import { get } from 'svelte/store';
import { AuthenticationModel } from '$lib/models/authentication_model';
import { AuthenticationService } from '$lib/services/authentication_service';
import { AuthSuccessState } from '$lib/states/authentication_state';

const mockedProvider = vi.fn().mockImplementation(() => ({
  login: vi.fn().mockResolvedValue(loginResponse),
  refreshToken: vi.fn().mockResolvedValue(loginResponse)
}))

  describe('AuthenticationService', () => {
    let authRepository: AuthenticationRepository;
    let mockDataProvider: Mocked<AuthenticationDataProvider>;
    let authService: AuthenticationService;
  
    beforeEach(() => {
      mockDataProvider = new mockedProvider() as Mocked<AuthenticationDataProvider>;
      authRepository = new AuthenticationRepository(mockDataProvider);
      authService = new AuthenticationService(authRepository);
    });
  
    it('should successfully log in a user and set the auth state as AuthSuccessState with a UserModel instance.', async () => {
  
      vi.mocked(mockDataProvider.login);
  
      await authService.login('testuser', 'testpassword');
  
      expect(get(authState)).instanceOf(AuthSuccessState);
      expect((get(authState) as AuthSuccessState).authModel).toBeInstanceOf(AuthenticationModel);
      expect((get(authState) as AuthSuccessState).authModel.authenticatedUser).toBeInstanceOf(UserModel);
    });

    it('should successfully refresh a user token and set the auth state as AuthSuccessState with a UserModel instance.', async () => {
  
      vi.mocked(mockDataProvider.login);
  
      await authService.refreshToken('1c6c9cae-3152-4bb7-b9d0-af8d2f903c2f');
  
      expect(get(authState)).instanceOf(AuthSuccessState);
      expect((get(authState) as AuthSuccessState).authModel).toBeInstanceOf(AuthenticationModel);
      expect((get(authState) as AuthSuccessState).authModel.authenticatedUser).toBeInstanceOf(UserModel);
    });
  });