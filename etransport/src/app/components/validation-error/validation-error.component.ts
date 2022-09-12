import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.scss'],
})
export class ValidationErrorComponent implements OnInit {

  constructor() { }

  @Input() message : string;
  ngOnInit() {}

}
