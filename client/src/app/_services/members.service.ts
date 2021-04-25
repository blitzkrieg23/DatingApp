import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import {  getPaginatedResult,getPaginationHeaders } from './paginationHelper';
// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: 'Bearer '+ JSON.parse(localStorage.getItem('user'))?.token
//   })
// }
@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private http:HttpClient) { }
  baseUrl = environment.apiUrl;
  members:Member[] =[];
  paginatedResult:PaginatedResult<Member[]>= new PaginatedResult<Member[]>();
  getMembers(userParams:UserParams){
    let params = getPaginationHeaders(userParams.pageNumber,userParams.pageSize);

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    // params = params.append('orderBy', userParams.orderBy);
    return getPaginatedResult<Member[]>(this.baseUrl + 'users', params, this.http)
  }
  getMember(username:string){
    const member = this.members.find(x => x.username === username);
    if(member !== undefined) return of(member);
    return this.http.get<Member>(environment.apiUrl + 'users/'+username);
  }
  updateMember(member:Member){
    return this.http.put(this.baseUrl+ 'users',member).pipe(
      map(() =>{
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }

  setMainPhoto(photoId:Number){
    return this.http.put(this.baseUrl+ 'users/set-main-photo/'+photoId,{})
  }

  deletePhoto(photoId:number){
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }
}
