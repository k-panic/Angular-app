import { NgModule } from '@angular/core';
import { AuthLibComponent } from './auth-lib.component';
import { AuthLibRoutingModule } from './auth-lib-routing.module';



@NgModule({
  declarations: [AuthLibComponent],
  imports: [
    AuthLibRoutingModule,
  ],
  exports: [AuthLibComponent]
})
export class AuthLibModule { }
