import { Injectable } from "@angular/core";
import { UserModel } from "app/models/UserModel";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from "rxjs";
import { Router, RouterLinkWithHref, } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { IUserLogin } from "app/models/IUserLogin";


@Injectable({ providedIn: 'root' })
export class UserService {

    URL_SUPABASE = 'https://frrwaoacgpogsszqpyxc.supabase.co/rest/v1/'

    constructor(private _httpclient: HttpClient, private router: Router) { }

    supabaseheaders = new HttpHeaders()
        .set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZycndhb2FjZ3BvZ3NzenFweXhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcyODIzMTYsImV4cCI6MjAxMjg1ODMxNn0.nuP5eBF5vJFZfIS6e_rD7PVNuFiSREDD2vgqnYyKZ8U')

    getUserListSupaBase(): Observable<UserModel[]> {
        return this._httpclient.get<UserModel[]>(this.URL_SUPABASE, { headers: this.supabaseheaders, responseType: 'json' });
    }

    getUser(user_id: string): Observable<UserModel> {
        return this._httpclient.get<UserModel[]>(this.URL_SUPABASE + 'USERS?user_id=eq.' + user_id, { headers: this.supabaseheaders, responseType: 'json' }).pipe(
            map( (userInfo) => {
                return userInfo[0];
            })
        );
    }

    getUserById(userId: number): Observable<UserModel> {
       return this._httpclient.get<UserModel>(`${this.URL_SUPABASE}/users/${userId}`, { headers: this.supabaseheaders });
    }

    addNewUser(user: Partial<UserModel>): Observable<Partial<UserModel>> {
        return this._httpclient.post<Partial<UserModel>>(this.URL_SUPABASE + 'USERS', user, { headers: this.supabaseheaders });
    }

    authUser(): Observable<UserModel> {
        return this._httpclient.get<UserModel>(this.URL_SUPABASE.concat('?email=eq.ctapia'), { headers: this.supabaseheaders.set('Accept', 'application/vnd.pgrst.object+json'), responseType: 'json' })
    }

    getLoginUser(iUserLogin: IUserLogin): Observable<string | any> {
        return this._httpclient.get<any>(this.URL_SUPABASE + "USERS?email=eq." + iUserLogin.email + "&password=eq." + iUserLogin.password, { headers: this.supabaseheaders }).pipe(
            map((user) => {
                console.log(user[0]);
                return user[0].user_id;
            }), catchError((err) => {
                console.log(err)
                return err;
            })
        );
    }

    async logout(): Promise<void> {
        // Elimina la información del usuario de las Preferencias.
        await Preferences.remove({ key: 'user' });

        // Redirige al usuario a la página de inicio o login.
        this.router.navigate(['/login']);
    }

    //getUserType(user_id: string){
    //    return this._httpclient.get<any>(this.URL_SUPABASE+"users_type?user=eq."+user_id+"&select=id,created_at,user(*),type(*)", { headers: this.supabaseheaders}).pipe(
    //        map((userInfo) => {
    //            console.log(userInfo);
    //            return userInfo;
    //        })
    //    )
    // }
}
