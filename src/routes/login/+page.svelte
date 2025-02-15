<script lang="ts">
	import { goto } from "$app/navigation";
	import AuthenticationComponent from "$lib/components/AuthenticationComponent.svelte";
	import { AuthenticationDataProvider } from "$lib/data_providers/authentication_data_provider";
	import { AuthenticationRepository } from "$lib/repositories/authentication_repository";
	import { AuthenticationService } from "$lib/services/authentication_service";
	import { AuthErrorState, AuthInitialState, AuthLoggingInState, AuthSuccessState } from "$lib/states/authentication_state";
	import { authState } from "$lib/stores/state_store";
	import { onDestroy } from "svelte";
    import { get } from "svelte/store";

    let username = '';
    let password = '';
    const unsubscribe = authState.subscribe(() => handleAuthStateChange());
    

    


    async function attemptLogin() {
        console.log('Attempt Login');
        const service = new AuthenticationService(new AuthenticationRepository(new AuthenticationDataProvider));
        service.login(username, password);
      
    }

    function handleAuthStateChange() {
    if(get(authState) instanceof AuthSuccessState)
    {
      goto('/home');
    }
    
  }
  onDestroy(unsubscribe);
</script>

<AuthenticationComponent />

{#if $authState instanceof AuthLoggingInState}
<h1>Logging in...</h1>

{:else if get(authState) instanceof AuthInitialState ||  get(authState)  instanceof AuthErrorState}
<div class="mt-5 flex justify-center">
    <div class="card">
      <div class="card-body">
        <h1 class="card-title text-center mb-4 font-bold text-xl">Svelte Web App N-Tier Template</h1>
        <form on:submit|preventDefault={attemptLogin}>
          <h3 class="font-bold text-baase py-8">Sign in to My App</h3>
          <div class="mb-3">
            <label for="username" class="form-label block">Username</label>
            <input type="text" placeholder="example@email.com" class="w-full rounded-md border border-gray-300 p-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" id="username" bind:value={username} />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label block">Password</label>
            <input type="password" placeholder="Password" class="w-full rounded-md border border-gray-300 p-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" id="password" bind:value={password} />
          </div>
          <button type="button" class="bg-black text-white rounded-md px-4 py-2 w-full" on:click={attemptLogin}>Login</button>
        </form>
      </div>
    </div>
  </div>

{/if}
