import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {RouterModule,ActivatedRouteSnapshot} from '@angular/router'
import {AuthService} from './user/auth.service'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http'

import {
    EventsListComponent,
    EventThumbnailComponent,
    EventService,
    EventDetailsComponent,
    CreateEventComponent,
    EventsListResolver,
    CreateSessionComponent,
    SessionListComponent,
    DurationPipe,
    UpvoteComponent,
    VoterService,
    LocationValidator,
    EventResolver
} from './events/index'

import {EventsAppComponent} from './events-app.component'
import {NavBarComponent} from './nav/navbar.component'
import {
    JQ_TOKEN,
    TOASTR_TOKEN,
    Toastr,
    CollapsibleWellComponent,
    SimpleModalComponent,
    ModalTriggerDirective
    } from './common/index'
import {appRoutes} from './routes'
import {Error404Component} from './errors/404.component'

declare let toastr : Toastr
declare let jQuery : Object;

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        ReactiveFormsModule,
        HttpModule
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
        DurationPipe,
        SimpleModalComponent,
        ModalTriggerDirective,
        UpvoteComponent,
        LocationValidator
    ],
    providers: [
        EventsListResolver,
        EventService, 
        {provide: TOASTR_TOKEN, useValue: toastr}, 
        {provide: JQ_TOKEN, useValue: jQuery}, 
        EventResolver,
        AuthService,
        VoterService,
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