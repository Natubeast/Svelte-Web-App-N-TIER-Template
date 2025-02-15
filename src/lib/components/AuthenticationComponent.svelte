<script lang="ts">
	import { goto } from "$app/navigation";
	import { AuthenticationDataProvider } from "$lib/data_providers/authentication_data_provider";
	import { AuthenticationRepository } from "$lib/repositories/authentication_repository";
	import { AuthenticationService } from "$lib/services/authentication_service";
	import { onDestroy, onMount } from "svelte";
    import { authState } from "$lib/stores/state_store";
	import { AuthErrorState } from "$lib/states/authentication_state";
	import { get} from "svelte/store";


    const unsubscribe = authState.subscribe(() => handleStateChange());
    

    onMount(() => {
        const service = new AuthenticationService(new AuthenticationRepository(new AuthenticationDataProvider))
        service.checkAuth();
  });

  function handleStateChange() {
    if(get(authState) instanceof AuthErrorState)
    {
        goto('/login');
    }
  }
    
  onDestroy(unsubscribe);
</script>
