import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {RouterModule,ActivatedRouteSnapshot} from '@angular/router'
import {AuthService} from './user/auth.service'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import {
    EventsListComponent,
    EventThumbnailComponent,
    EventService,
    EventDetailsComponent,
    CreateEventComponent,
    EventRouteActivator,
    EventsListResolver,
    CreateSessionComponent,
    SessionListComponent,
    DurationPipe
} from './events/index'

import {EventsAppComponent} from './events-app.component'
import {NavBarComponent} from './nav/navbar.component'
import {TOASTR_TOKEN, Toastr} from './common/toastr.service'
import {CollapsibleWellComponent} from './common/collapsible-well.component'
import {appRoutes} from './routes'
import {Error404Component} from './errors/404.component'

declare let toastr : Toastr

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        EventsAppComponent,
        EventsListComponent,
        EventThumbnailComponent,
        NavBarComponent,
        EventDetailsComponent,
        CreateEventComponent,
        Error404Component,
        CreateSessionComponent,
        SessionListComponent,
        CollapsibleWellComponent,
        DurationPipe
    ],
    providers: [
        EventsListResolver,
        EventService, 
        {provide: TOASTR_TOKEN, useValue: toastr}, 
        EventRouteActivator,
        AuthService,
        {provide: 'canDeactivateCreateEvent', useValue: checkDirtyState}
    ],
    bootstrap: [EventsAppComponent]
})
export class AppModule {}

function checkDirtyState(component:CreateEventComponent) {
    if (component.isDirty) {
        return window.confirm('You have changes to save')
    } else {
        return true; 
    }
}