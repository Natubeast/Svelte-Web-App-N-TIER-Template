import type { APIResponseType } from '$lib/types/api_response_type';
import loginResponse from '../../test/data/data_provider_responses/auth_data_provider_login_response.json';

export class AuthenticationDataProvider {
    async login(username: string, password: string): Promise<APIResponseType> {
        //Simulate API Call
        console.log(`Logging in ${username} with ${password}  `);
        await wait(200);
        const data: APIResponseType = loginResponse;
        if (data.error != undefined) {
            throw Error(data.error);
        }
        return data;
    }

    async refreshToken(token: string): Promise<APIResponseType> {
        console.log(`Refreshing token ${token}`);
        await wait(200);
        const data: APIResponseType = loginResponse;
        if (data.error != undefined) {
            throw Error(data.error);
        }
        return data;
    }

    

}

function wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }