import { describe, it, expect, vi, beforeEach, type Mocked } from 'vitest';
import {AuthenticationRepository} from '../../lib/repositories/authentication_repository';
import {AuthenticationDataProvider} from '../../lib/data_providers/authentication_data_provider';

// Import the JSON data
import loginResponse from '../data/data_provider_responses/auth_data_provider_login_response.json';
import { AuthenticationModel } from '$lib/models/authentication_model';

const mockedProvider = vi.fn().mockImplementation(() => ({
  login: vi.fn().mockResolvedValue(loginResponse),
  refreshToken: vi.fn().mockResolvedValue(loginResponse)
  
}))

  describe('AuthenticationRepository', () => {
    let authRepository: AuthenticationRepository;
    let mockDataProvider: Mocked<AuthenticationDataProvider>;
  
    beforeEach(() => {
      mockDataProvider = new mockedProvider() as Mocked<AuthenticationDataProvider>;
      authRepository = new AuthenticationRepository(mockDataProvider);
    });
  
    it('should successfully log in a user', async () => {
  
      vi.mocked(mockDataProvider.login);
  
      const result = await authRepository.login('testuser', 'testpassword');
  
      expect(result.success).toBe(true);
      expect(result.authModel).toBeInstanceOf(AuthenticationModel);
      expect(result.authModel?.authenticatedUser?.userId).toBe('user123');
      expect(result.authModel?.authenticatedUser?.userName).toBe('John Doe');
      // ... other assertions for other properties
    });
  
    // it('should fail to log in a user', async () => {
    //   const errorMessage = 'Login failed';
    //   vi.mocked(mockDataProvider.login).mockRejectedValueOnce(new Error(errorMessage));
  
    //   const result = await authRepository.login('testuser', 'testpassword');
  
    //   expect(result.success).toBe(false);
    //   expect(result.error).toBe(errorMessage);
    // });
  
    it('should successfully refresh a user token', async () => {
      vi.mocked(mockDataProvider.refreshToken);
  
      const result = await authRepository.refreshToken('1c6c9cae-3152-4bb7-b9d0-af8d2f903c2f');
  
      expect(result.success).toBe(true);
      expect(result.authModel).toBeInstanceOf(AuthenticationModel);
      expect(result.authModel?.authenticatedUser?.userId).toBe('user123');
      expect(result.authModel?.authenticatedUser?.userName).toBe('John Doe');
    });
    
  });