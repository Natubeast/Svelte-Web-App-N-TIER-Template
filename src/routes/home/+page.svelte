<script lang="ts">
	import AuthenticationComponent from "$lib/components/AuthenticationComponent.svelte";
	import { AuthLoggingInState, AuthSuccessState } from "$lib/states/authentication_state";
	import { authState } from "$lib/stores/state_store";
	import { onDestroy, onMount } from "svelte";
	import { get } from "svelte/store";


  const unsubscribe = authState.subscribe(() => handleAuthStateChange());
  
  onMount(() => {
		
	});

  function handleAuthStateChange() {
    const currentAuthState = get(authState);
    if(currentAuthState instanceof AuthSuccessState)
    {
    //   handle auth stuff
    }
    
  }



  onDestroy(unsubscribe);

</script>

<AuthenticationComponent />
{#if $authState instanceof AuthLoggingInState}
<h1>Loading</h1>

{:else if $authState instanceof AuthSuccessState}
    <h1> Hi {$authState.authModel.authenticatedUser.userName}</h1>
{/if}

<style>

</style>