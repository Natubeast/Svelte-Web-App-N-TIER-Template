import { writable } from 'svelte/store';
import { AuthenticationDataProvider } from '$lib/data_providers/authentication_data_provider';
import { AuthenticationRepository } from '$lib/repositories/authentication_repository';
import { AuthenticationService } from '$lib/services/authentication_service';


const services = writable({
    AuthenticationService: new AuthenticationService(new AuthenticationRepository(new AuthenticationDataProvider())),
});



export default services;