// angular import
import { V } from '@angular/cdk/scrolling-module.d-ud2XrbF8';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppConstants } from 'src/app/core/services/app-constants';
import { HttpClientService } from 'src/app/core/services/http-client-service';
import { UtilsServiceService } from 'src/app/core/services/util-service';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export default class SignInComponent implements OnInit {
  isPasswordVisible: boolean = false;
  isLoading = false;
  isError = false;

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: HttpClientService,
    private toastr: ToastrService, private router: Router,
    private util: UtilsServiceService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        emailOrPhoneNumber: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(40),
          ],
        ]
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.authService.post(AppConstants.LOGIN, JSON.stringify({
      "email": "admin@gmail.com",
      "password": "Admin@123"
    }, null, 2)).subscribe(
      (response: any) => {
        const data = response;

        //  console.log('Response:', data.message);
        localStorage.setItem('access_token', this.util.encrypt_Text(data.access_token) || "")
        // localStorage.setItem('user_data', this.util.encrypt_Text(JSON.stringify(data.user)) || "")
        this.isLoading = false;
        this.toastr.success("Login Succss", "Success")
        this.router.navigate(['/'])
      },
      error => {
        console.error('An error occurred:', error);
        this.isError = true;
        this.isLoading = false;
        this.toastr.error(error, "Error")
      }
    );

    console.log(JSON.stringify(this.form.value, null, 2));
  }


}
