import {Component, OnInit} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ISession } from "../index";

@Component({
    templateUrl: 'app/events/event-details/create-session.component.html'
})
export class CreateSessionComponent {
    abstract: FormControl;
    level: FormControl;
    duration: FormControl;
    presenter: FormControl;
    name: FormControl;
    newSessionForm: FormGroup;

    saveSession(formValues) {
        let session:ISession = {
            id: undefined,
            name: formValues.Name,
            duration: +formValues.duration,
            level: formValues.level,
            presenter: formValues.presenter,
            abstract: formValues.abstract,
            voters: []
        }
    }
    
    ngOnInit() {
        this.name = new FormControl('', Validators.required)
        this.presenter = new FormControl('', Validators.required)
        this.duration = new FormControl('', Validators.required)
        this.level = new FormControl('', Validators.required)
        this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400)])

        this.newSessionForm = new FormGroup({
            name: this.name,
            presenter: this.presenter,
            duration: this.duration,
            level: this.level,
            abstract: this.abstract
        })
    }
}