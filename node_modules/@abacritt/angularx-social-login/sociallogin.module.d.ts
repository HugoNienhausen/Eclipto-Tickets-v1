import { ModuleWithProviders } from '@angular/core';
import { SocialAuthServiceConfig } from './socialauth.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * The main module of angularx-social-login library.
 */
export declare class SocialLoginModule {
    static initialize(config: SocialAuthServiceConfig): ModuleWithProviders<SocialLoginModule>;
    constructor(parentModule: SocialLoginModule);
    static ɵfac: i0.ɵɵFactoryDeclaration<SocialLoginModule, [{ optional: true; skipSelf: true; }]>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<SocialLoginModule, never, [typeof i1.CommonModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<SocialLoginModule>;
}
