import { AuthenticationRepository } from "$lib/repositories/authentication_repository";
import { AuthCheckingState, AuthErrorState, AuthLoggingInState, AuthSuccessState } from "$lib/states/authentication_state";
import { authState} from "$lib/stores/state_store";
import { getCookie, isWithin15Minutes, setCookie } from "$lib/utils/nice_utils";
import { get } from "svelte/store";
import { BaseService } from "./base_service";

export class AuthenticationService extends BaseService{

    constructor(private authRepository: AuthenticationRepository) {
        super();
    }


    async login(username: string, password: string)
    {
        try
        {
            authState.set(new AuthLoggingInState());
            const response = await this.authRepository.login(username, password);
            if(response.success && response.authModel != null)
                {
                    setCookie('token', response.authModel!.token, 1);
                    authState.update(() => new AuthSuccessState(response.authModel!));
                }
            else
            {
                authState.update(() => new AuthErrorState(response.error!));
            }
        }
        catch(error)
        {
            authState.set(new AuthErrorState((error as Error).message));
        }
        

    }


    async refreshToken(token: string)
    {
        try
        {
            authState.set(new AuthLoggingInState());
            const response = await this.authRepository.refreshToken(token);
            if(response.success && response.authModel != null)
                {
                    setCookie('token', response.authModel!.token, 1);
                    authState.update(() => new AuthSuccessState(response.authModel!));
                }
            else
            {
                authState.update(() => new AuthErrorState(response.error!));
            }
        }
        catch(error)
        {
            authState.set(new AuthErrorState((error as Error).message));
        }
        

    }
    
    async checkAuth()
    {
        authState.set(new AuthCheckingState());
        const currentState = get(authState);

        //Verify we have AuthSuccessState. If not, try 

        if(currentState instanceof AuthSuccessState)
        {
            //Check expiry. If expired, login with token.
            if(currentState.authModel.expiresAt < new Date())
            {
                authState.update(() => new AuthErrorState('Token expired'));
            }
            else if (isWithin15Minutes(currentState.authModel.expiresAt)){
                this.refreshToken(currentState.authModel.token);
            }
            else
            {
                authState.update(() => new AuthSuccessState(currentState.authModel));
            }
        }
        else{
            //Check if there is a token in the cookies. If so, login.
            const cookie = getCookie('token');
            if(!cookie)
            {
                authState.update(() => new AuthErrorState('No token to refresh'));
            }
            else
            {
                this.refreshToken(cookie);
            }
        }

    }
    
}