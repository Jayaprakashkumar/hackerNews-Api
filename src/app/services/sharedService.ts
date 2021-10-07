import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {

    private commentList = new BehaviorSubject([]);
    currentMessage = this.commentList.asObservable();

    constructor() { }

    changeStories(message: any[]) {
        this.commentList.next(message)
    }

}