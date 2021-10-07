import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { forkJoin, Observable } from 'rxjs'
import { environment } from 'src/environments/environment.prod';

export interface comments {
    by: string;
    parent: number;
    id: number;
    kids?: Array<number>;
    text:string;
    time: Date | string;
    type: string,
}

@Injectable()

export class CommentsService {

    constructor(private http: HttpClient) { }

    private topThreeComments = `${environment.URL}/item`;

    public getTopThreeStories(list: number[]): Observable<any[]> {

        const comments = list.map(ele => this.http.get<comments>(`${this.topThreeComments}/${ele}.json?print=pretty`));

         return forkJoin(comments);
    }


}
