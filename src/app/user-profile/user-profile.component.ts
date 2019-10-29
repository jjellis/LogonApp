import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../user-profile.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
//profile: object = {};
profileForm: FormGroup;
  profile: any;
  constructor(
    private UserProfileService: UserProfileService, 
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      firstName: "tim",
      lastName: "crawford",
      birthday: "05/20/1978",
      address: "poat ave",
      faveFood: "taco",
      favemovie: "lion king",
      faveartist: "boo",
      hobbies: "none"

    })
  }
 post(form){
   this.UserProfileService.post(this.profileForm.value)
   .subscribe(data =>(this.profile = data))
 }

 onSubmit(form) {
  this.UserProfileService.post(form).subscribe(console.log)


}
}
