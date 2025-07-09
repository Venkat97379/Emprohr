// angular import
import { Component, OnInit, viewChild } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// 3rd party import

import { ApexOptions, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { FormBuilder } from '@angular/forms';
import { AppConstants } from 'src/app/core/services/app-constants';
import { HttpClientService } from 'src/app/core/services/http-client-service';
import Swal from 'sweetalert2';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-dash-analytics',
  standalone: true,
  providers: [CurrencyPipe],
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './dash-analytics.component.html',
  styleUrls: ['./dash-analytics.component.scss']
})
export default class DashAnalyticsComponent implements OnInit {
  // public props
  chart = viewChild<ChartComponent>('chart');
  customerChart = viewChild<ChartComponent>('customerChart');
  chartOptions!: Partial<ApexOptions>;
  chartOptions_2!: Partial<ApexOptions>;
  dashboardData: any = {};
  cards: any[] = [];
  loading = false;
  editId: number | null = null;
  totalAds: number = 0;

  constructor(private currencyPipe: CurrencyPipe, private apiService: HttpClientService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.apiService.getwithAuth(AppConstants.DASHBOARD).subscribe({
      next: (res) => {
        this.dashboardData = res.data;
        this.loadDashboard();
      },
      error: (err) => {
        Swal.fire('Error', 'Failed to load data', 'error');
      }
    });
  }
  loadDashboard() {
    this.cards = []
    this.cards.push({
      background: 'bg-c-blue',
      title: 'Users',
      icon: 'icon-users',
      text: 'Registered Users',
      revenue: this.dashboardData.usersCount.usersYearCount,
      data: [{ 'count': this.dashboardData.usersCount.todayUsersCount, 'sum': '-1' }, { 'count': this.dashboardData.usersCount.usersWeekCount, 'sum': '-1' }, { 'count': this.dashboardData.usersCount.usersMonthCount, 'sum': '-1' }, { 'count': this.dashboardData.usersCount.usersYearCount, 'sum': '-1' }]
    })
    this.cards.push({
      background: 'bg-c-green',
      title: 'Insurance',
      icon: 'icon-user',
      text: 'Insurance Orders',
      revenue: this.formatToMYR(this.dashboardData.insuranceCount.insuranceYearCount.sum),
      data: [{ 'count': this.dashboardData.insuranceCount.todayInsuranceCount.count, 'sum': this.dashboardData.insuranceCount.todayInsuranceCount.sum },
      { 'count': this.dashboardData.insuranceCount.insuranceWeekCount.count, 'sum': this.dashboardData.insuranceCount.insuranceWeekCount.sum },
      { 'count': this.dashboardData.insuranceCount.insuranceMonthCount.count, 'sum': this.dashboardData.insuranceCount.insuranceMonthCount.sum },
      { 'count': this.dashboardData.insuranceCount.insuranceYearCount.count, 'sum': this.dashboardData.insuranceCount.insuranceYearCount.sum },
      ]
    })
    this.cards.push({
      background: 'bg-c-yellow',
      title: 'Assist (Basic)',
      icon: 'icon-user',
      text: 'Insurance Orders',
      revenue: this.formatToMYR(this.dashboardData.assistCount.yearInsuranceAssist.basic.sum),
      data: [{ 'count': this.dashboardData.assistCount.todayInsurnaceAssist.basic.count, 'sum': this.dashboardData.assistCount.todayInsurnaceAssist.basic.sum },
      { 'count': this.dashboardData.assistCount.weekInsuranceAssist.basic.count, 'sum': this.dashboardData.assistCount.weekInsuranceAssist.basic.sum },
      { 'count': this.dashboardData.assistCount.monthInsuranceAssist.basic.count, 'sum': this.dashboardData.assistCount.monthInsuranceAssist.basic.sum },
      { 'count': this.dashboardData.assistCount.yearInsuranceAssist.basic.count, 'sum': this.dashboardData.assistCount.yearInsuranceAssist.basic.sum },
      ]
    })
    this.cards.push({
      background: 'bg-c-red',
      title: 'Assist (Premium)',
      icon: 'icon-user',
      text: 'Insurance Orders',
      revenue: this.formatToMYR(this.dashboardData.assistCount.yearInsuranceAssist.premium.sum),
      data: [{ 'count': this.dashboardData.assistCount.todayInsurnaceAssist.premium.count, 'sum': this.dashboardData.assistCount.todayInsurnaceAssist.premium.sum },
      { 'count': this.dashboardData.assistCount.weekInsuranceAssist.premium.count, 'sum': this.dashboardData.assistCount.weekInsuranceAssist.premium.sum },
      { 'count': this.dashboardData.assistCount.monthInsuranceAssist.premium.count, 'sum': this.dashboardData.assistCount.monthInsuranceAssist.premium.sum },
      { 'count': this.dashboardData.assistCount.yearInsuranceAssist.premium.count, 'sum': this.dashboardData.assistCount.yearInsuranceAssist.premium.sum },
      ]
    })
    /*this.cards.push({
      background: 'bg-c-yellow',
      title: 'Assist Basic',
      icon: 'icon-sliders',
      text: 'Total Assist Basic Plans',
      revenue: 0,
      data: this.dashboardData.todayInsurnaceAssist
    })
    this.cards.push({
      background: 'bg-c-red',
      title: 'Assist Premium',
      icon: 'icon-credit-card',
      text: 'Total Assist Premium Plans',
      revenue: 0,
      data: this.dashboardData.premiumAssistCount
    })*/

  }
  formatToMYR(value: number): string {
    return this.currencyPipe.transform(value, 'MYR ', 'symbol', '1.0-0') ?? '';
  }
}
