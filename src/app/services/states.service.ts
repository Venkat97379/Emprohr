import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api.client';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  states:any[]=[];
  constructor(private api: ApiService, ) { }
  private statesSource = new BehaviorSubject<any[]>([]);
  states$ = this.statesSource.asObservable();
  fetchStates(){
  this.api.get('Admin/get_all_states').subscribe((res: any) => {
    this.states = res;

  }, (error) => {
    console.log(error);
  })}
  setStates(states: any[]) {
    this.statesSource.next(states);
  }
}
