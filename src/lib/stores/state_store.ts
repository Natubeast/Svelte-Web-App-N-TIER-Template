import { AuthInitialState } from '$lib/states/authentication_state';
import { writable } from 'svelte/store';

export const authState = writable(new AuthInitialState(), () => {
	//console.log('got a subscriber');
	return () => /*console.log('no more subscribers')*/ null;
});
