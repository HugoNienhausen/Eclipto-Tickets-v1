import { Routes } from '@angular/router';
import { UserPanelComponent } from '../modules/user/components/user-panel/user-panel.component';
import { WelcomeComponent } from '../modules/auth/welcome/welcome.component';
import { UserAuthGuard } from '../core/guards/user.auth.guard';
import { AdminPanelComponent } from '../modules/admin/components/admin-panel/admin-panel.component';
import { AdminAuthGuard } from '../core/guards/admin.auth.guard';
import { UnauthorizedComponent } from '../modules/auth/unauthorized/unauthorized.component';
import { PublicEventComponent } from '../shared/public-event/public-event/public-event.component';
export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'admin/panel', component: AdminPanelComponent, canActivate: [AdminAuthGuard] },
  { path: 'user/panel', component: UserPanelComponent, canActivate: [UserAuthGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'public/event/:userId/:eventId', component: PublicEventComponent }
];