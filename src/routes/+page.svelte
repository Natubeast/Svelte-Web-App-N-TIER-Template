<script lang="ts">
	import { goto } from "$app/navigation";
	import AuthenticationComponent from "$lib/components/AuthenticationComponent.svelte";
	import { AuthSuccessState } from "$lib/states/authentication_state";
	import { authState } from "$lib/stores/state_store";
	import { onDestroy } from "svelte";
	import { get } from "svelte/store";

  const unsubscribe = authState.subscribe(() => handleAuthStateChange());
    

    



    function handleAuthStateChange() {
    if(get(authState) instanceof AuthSuccessState)
    {
      goto('/home');
    }
    
  }
  onDestroy(unsubscribe);

</script>
<AuthenticationComponent />

<h1>Loading</h1>

