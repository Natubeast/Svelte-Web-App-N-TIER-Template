import type { AuthenticationModel } from "$lib/models/authentication_model";
import { BaseState } from "$lib/states/base_state";


export class AuthInitialState extends BaseState {
  constructor() {
    super();
  }
}
  export class AuthLoggingInState extends BaseState {
    constructor() {
      super();
    }
  }
  
  export class AuthSuccessState extends BaseState {
    constructor(public authModel: AuthenticationModel) {
      super();
      this.authModel = authModel;
    }
  }
  
  export class AuthErrorState extends BaseState {
    constructor(public error: string) {
      super();
      this.error = error;
    }
  }

  export class AuthCheckingState extends BaseState {
    constructor() {
      super();
    }
  }