import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MoveModel } from 'src/app/model/move-model.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoveService {
  MOVES_API = environment.MOVES_API
  constructor(private http: HttpClient) { }

  addMove(data: MoveModel): Observable<any> {
    return this.http.post(
      this.MOVES_API,
      data
    );
  }

  getMove(id: number): Observable<any> {
    return this.http.get(this.MOVES_API+id);
  }

  getAllMoves(): Observable<any> {
    return this.http.get(this.MOVES_API);
  }

  deleteMove(_id:number): Observable<any> {
    return this.http.delete(this.MOVES_API+_id);
  }

  updateMove(data: MoveModel): Observable<any> {
    return this.http.put(
      this.MOVES_API + data._id,
      data
    )
  }
}
