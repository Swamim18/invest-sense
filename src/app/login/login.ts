import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

// Firebase imports
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.sass'
})
export class Login {
  form: FormGroup;
  error: string | null = null;

  // Initialize Firebase
  private _app = initializeApp(environment.firebaseConfig);
  private _auth = getAuth(this._app);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onSubmit() {
    const { email, password } = this.form.value;
    signInWithEmailAndPassword(this._auth, email, password)
      .then(() => {
        this.error = null;
        alert('Login successful');
      })
      .catch((error) => {
        this.error = error.message;
        alert('Login failed: ');
        console.error('Login error:', this.error);
      });
  }
}

