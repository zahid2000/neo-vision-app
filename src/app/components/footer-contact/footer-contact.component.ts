import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './footer-contact.component.html',
  styleUrl: './footer-contact.component.scss'
})
export class FooterContactComponent implements OnInit {
  contactForm!: FormGroup;
  isLoading = false;
  isSubmitted = false;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      namesurname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.errorMessage = 'Zəhmət olmasa formu tam doldurun.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Simulate form submission
    setTimeout(() => {
      this.isLoading = false;
      this.isSubmitted = true;
      this.successMessage = 'Mesajınız uğurla göndərildi. Tezliklə sizinlə əlaqə saxlayacağıq.';
      this.contactForm.reset();
    }, 1500);
  }
}
