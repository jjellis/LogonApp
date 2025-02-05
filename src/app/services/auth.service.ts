import { Injectable } from "@angular/core";
import { Iuser } from "../iuser";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Iuser>;
  public currentUser: Observable<Iuser>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Iuser>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Iuser {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>("https://localhost:44367/api/auth/login",{
        email: email,
        password:password
      })
      .pipe(
        map(user => {
          console.log(user);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }

  register(user: any): Observable<Iuser> {
    return this.http.post<Iuser>(
      "https://localhost:44367/api/auth/register",
      user
    );
  }
}
