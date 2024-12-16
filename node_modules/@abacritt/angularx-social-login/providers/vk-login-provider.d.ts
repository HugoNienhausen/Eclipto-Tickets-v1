import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/social-user';
export declare class VKLoginProvider extends BaseLoginProvider {
    private clientId;
    private initOptions;
    constructor(clientId: string, initOptions?: {
        fields: string;
        version: string;
    });
    static readonly PROVIDER_ID: string;
    private readonly VK_API_URL;
    private readonly VK_API_GET_USER;
    initialize(): Promise<void>;
    getLoginStatus(): Promise<SocialUser>;
    signIn(permissions: string[]): Promise<SocialUser>;
    signOut(): Promise<void>;
    private signInInternal;
    private getUser;
    private getLoginStatusInternal;
    private createUser;
}
