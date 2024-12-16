import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/social-user';
export declare class FacebookLoginProvider extends BaseLoginProvider {
    private clientId;
    static readonly PROVIDER_ID: string;
    private requestOptions;
    constructor(clientId: string, initOptions?: Object);
    initialize(): Promise<void>;
    getLoginStatus(): Promise<SocialUser>;
    signIn(signInOptions?: any): Promise<SocialUser>;
    signOut(): Promise<void>;
}
