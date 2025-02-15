import { AuthenticationDataProvider } from "$lib/data_providers/authentication_data_provider";
import { AuthenticationRepository } from "$lib/repositories/authentication_repository";
import { AuthenticationService } from "$lib/services/authentication_service";
import { redirect } from "@sveltejs/kit";

// Define routes that should be excluded from authentication checks
const publicRoutes = ['/login'];

// src/hooks.server.js
export async function handle({ event, resolve }) {
    const { pathname } = event.url;

    // Check if the current route is in the list of public routes
    if (publicRoutes.includes(pathname)) {
        // If the route is public, proceed without authentication check
        return resolve(event);
    }

    // Perform your authentication check here
    const service = new AuthenticationService(new AuthenticationRepository(new AuthenticationDataProvider));
    const isAuthenticated = await service.checkAuthServerSide(event.cookies);
    console.log('Authenticated');
    console.log(isAuthenticated);
    if(!isAuthenticated)
        {
            redirect(302, "/login");
        }

    // Continue with the request if authenticated
    return resolve(event);
}