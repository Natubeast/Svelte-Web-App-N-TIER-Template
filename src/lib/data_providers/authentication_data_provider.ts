import type { APIResponseType } from '$lib/types/api_response_type';
import loginResponse from '../../test/data/data_provider_responses/auth_data_provider_login_response.json';

export class AuthenticationDataProvider {
    async login(username: string, password: string): Promise<APIResponseType> {
        //Simulate API Call
        
        const data: APIResponseType = loginResponse;
        if (data.error != undefined) {
            throw Error(data.error);
        }
        return data;
    }

    async refreshToken(token: string): Promise<APIResponseType> {
        const data: APIResponseType = loginResponse;
        if (data.error != undefined) {
            throw Error(data.error);
        }
        return data;
    }

}