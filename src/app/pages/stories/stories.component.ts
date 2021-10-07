import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { stories, StoriesService } from '../../services/stories.service'
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/sharedService';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
  providers: [StoriesService]
})
export class StoriesComponent implements OnInit, OnDestroy {

  public topFiveStories$: stories[];
  public subscription: Subscription
  constructor(private storiesService: StoriesService, private toastr: ToastrService, private sharedService: SharedService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    this.subscription = timer(0, 20000000).pipe(
      switchMap(() => this.storiesService.getAllStories())
    ).subscribe(ele => { this.spinner.show(); this.formatData(ele); })

  }

  public formatData(list: number[]) {
    const topFive = list.splice(0, 5);

    this.storiesService.getTopFiveStories(topFive).subscribe(res => {
      if (res) {
        this.topFiveStories$ = res;
        this.spinner.hide()
      }

    }, (error) => console.log(error));


  }

  public goToComments(commentsList: number[], id: number) {
    if (commentsList.length === 0) return this.toastr.info("No Comments available");
    this.sharedService.changeStories(commentsList);
    this.router.navigateByUrl(`/stories/${id}/comments`)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.spinner.hide();
  }

}
