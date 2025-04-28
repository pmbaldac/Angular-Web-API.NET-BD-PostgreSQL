
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { routes } from './app.routes';

@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(routes), MenuComponent],
    exports: [RouterModule]
})
export class AppRoutingModule {}
