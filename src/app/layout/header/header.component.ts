import {Component, OnInit} from '@angular/core';
import {RouterService} from "../../shared/services/router.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = '';

  constructor(private routerService: RouterService) {
  }

  ngOnInit(): void {
    this.routerService.getRouterData()
      .subscribe(data => this.title = data.title);
  }

}
