import { describe, test, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, fireEvent, waitFor  } from '@testing-library/svelte';


import LoginPage from '../../routes/login/+page.svelte';
import { authState } from '../../lib/stores/state_store';
import { AuthInitialState, AuthSuccessState } from '../../lib/states/authentication_state';
import { get } from 'svelte/store';

// Mock the goto function
vi.mock('$app/navigation', () => ({
  goto: vi.fn(),
}));

describe('/+page.svelte', () => {
  beforeEach(() => {
    // Reset the authState to its initial state before each test
    authState.set(new AuthInitialState());
  });
	test('should load the login page and log a user in', async () => {
		const { getByLabelText, getByText } = render(LoginPage);


    // Check if the login form is rendered
    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const loginButton = getByText('Login');

    expect(usernameInput).not.toBeNull();
    expect(passwordInput).not.toBeNull();
    expect(loginButton).not.toBeNull();

    // Simulate user input
    await fireEvent.input(usernameInput, { target: { value: 'testuser' } });
    await fireEvent.input(passwordInput, { target: { value: 'password' } });

    // Simulate login button click
    await fireEvent.click(loginButton);

    // Wait for the authState to change to AuthSuccessState or AuthErrorState
    await waitFor(async () => {
      const state = get(authState);
      expect(state).toBeInstanceOf(AuthSuccessState);

      // Verify that goto was called with the correct path
      const { goto } = await import('$app/navigation');
      expect(goto).toHaveBeenCalledWith('/home');
    }, { timeout: 300 }); // Wait for up to 2 seconds
    
	});
});

