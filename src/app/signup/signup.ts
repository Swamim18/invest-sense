import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

// Firebase imports
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-signup',
  imports: [RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.sass'
})
export class Signup {
  form: FormGroup;
  error: string | null = null;

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
    createUserWithEmailAndPassword(this._auth, email, password)
      .then(() => {
        // Handle successful signup
      })
      .catch((error) => {
        this.error = error.message;
      });
  }
}
