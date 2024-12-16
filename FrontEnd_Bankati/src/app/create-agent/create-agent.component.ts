import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-agent',
  templateUrl: './create-agent.component.html',
  styleUrls: ['./create-agent.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class CreateAgentComponent implements OnInit {
  agentForm: FormGroup;
  agent: any = {};
  email: string = '';

  constructor(private fb: FormBuilder, public router: Router) {
    this.agentForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      cin: ['', Validators.required],
      num_piece_identite: ['', Validators.required],
      date_naissance: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      num_immatriculation: [''],
      num_patente: [''],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.agentForm.valid) {
      console.log(this.agentForm.value);
      // Add your submission logic here
    }
  }

  cancel() {
    this.agentForm.reset();
  }
}
