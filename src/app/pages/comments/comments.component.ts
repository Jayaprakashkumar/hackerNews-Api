import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { comments, CommentsService } from 'src/app/services/comments.service';
import { SharedService } from 'src/app/services/sharedService';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [CommentsService]
})
export class CommentsComponent implements OnInit, OnDestroy {

  public subscription: Subscription;
  public commentsList: comments[];
  constructor(private commentService: CommentsService, private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {

    let comments;
    this.subscription = this.sharedService.currentMessage.subscribe(res => comments = res);

    if (comments?.length == 0) this.router.navigate(["stories"]);

    this.getTopThreeComments(comments)

  }

  public getTopThreeComments(comments: number[]) {

    this.commentService.getTopThreeStories(comments.splice(0, 3)).subscribe(res => {
      this.commentsList = res;

      console.log(res);
    })
  }


  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }

}
