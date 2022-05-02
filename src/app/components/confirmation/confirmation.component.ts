import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  fullName?: string;
  totalAmount?: number;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (!this.fullName || !this.totalAmount) {
      this.fullName = String(this.route.snapshot.paramMap.get('fullName'));
      this.totalAmount = Number(this.route.snapshot.paramMap.get('totalAmount'));
    }
  }

}
