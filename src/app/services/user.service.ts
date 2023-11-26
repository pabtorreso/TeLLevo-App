import { Injectable } from "@angular/core";
import { UserModel } from "app/models/UserModel";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from "rxjs";
import { Router, RouterLinkWithHref, } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { IUserLogin } from "app/models/IUserLogin";
import { environment } from "../../environments/environment";


@Injectable({ providedIn: 'root' })
export class UserService {

    URL_SUPABASE = environment.supabaseUrl; // Usa la URL desde environment

    constructor(private _httpclient: HttpClient, private router: Router) { }

    supabaseheaders = new HttpHeaders().set('apikey', environment.supabaseKey); // Usa la key desde environment
    
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
