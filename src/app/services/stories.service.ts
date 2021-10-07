import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { forkJoin, Observable } from 'rxjs'
import { environment } from 'src/environments/environment.prod';

export interface stories {
    by: string;
    descendants: string;
    id: number;
    kids?: Array<number>;
    score: number;
    time: Date | string;
    title: string,
    type: string,
    url: string
}

@Injectable()
export class StoriesService {

    constructor(private http: HttpClient) { }

    private allStories = `${environment.URL}/topstories.json?print=pretty`;
    private topFiveStories = `${environment.URL}/item`;

    public getAllStories(): Observable<number[]> {
        return this.http.get<number[]>(this.allStories);
    }

    public getTopFiveStories(list: number[]): Observable<any[]> {

        const topFiveList = list.map(ele => this.http.get<stories>(`${this.topFiveStories}/${ele}.json?print=pretty`));

         return forkJoin(topFiveList);
    }


}
