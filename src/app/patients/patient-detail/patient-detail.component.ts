import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Patient} from '../patient';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {PatientService} from '../patient.service';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import * as moment from 'moment';
import { Chart } from 'chart.js';


export interface Attack {
  attackDate: string;
  attackTime: string;
  attackLocation: string;
  uuid: string;
  userDate: string;
  id: number;
}

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PatientDetailComponent implements OnInit {
  patient$: Observable<Patient>;
  private AttacksDetail: Attack[];
  private reportData = [];
  private userID: string;
  private currentDate: string;
  dateList = [];
  bars: any;

  displayedColumns: string[] = ['id', 'attackDate', 'attackTime', 'attackLocation'];
  dataSource = new MatTableDataSource<Attack>(this.AttacksDetail);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('barChart', {static: true}) barChart;

  constructor(
    // asks Angular to inject services that the component requires
    private route: ActivatedRoute,
    private router: Router,
    private service: PatientService,
    private http: HttpClient,
    private cdf: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource = new MatTableDataSource<Attack>(this.AttacksDetail);
    this.userID = this.route.snapshot.paramMap.get('id');
    console.log(this.userID);
    this.getDetail();
    this.currentDate = new Date().toLocaleDateString();
    for (let i = 6; i >= 0; i--) {
      this.dateList[i] = moment().subtract(i, 'days').format('L').substring(0, 5);
    }
    this.dateList = this.dateList.reverse();
    this.reportData = [];
    this.getReport();
  }


  gotoPatients(patient: Patient) {
    const patientId = patient ? patient.id : null;
    this.router.navigate(['/admin/patients', { id: patientId}]); // optional parameters: { id: patientId}
  }

  getDetail() {
    this.requestPatientsDetail().subscribe(result => {
      this.parseJSON(result);
      console.log(this.AttacksDetail);
      this.dataSource = new MatTableDataSource<Attack>(this.AttacksDetail);
      this.cdf.markForCheck();
      this.cdf.detectChanges();
    });
  }

  requestPatientsDetail() {
    return this.http.get<string>(
      'https://stormy-dawn-15351.herokuapp.com/userAttacks?' + 'uuid=' + this.userID ,
      {responseType: 'json' });
  }

  parseJSON(result: string) {
    this.AttacksDetail = JSON.parse(JSON.stringify(result)) as Attack[];
  }

  getReport() {
    this.reportData = [];
    this.requestReport().subscribe(report => {
      this.reportData = report.substring(1, report.length - 1).split(',');
      console.log(this.reportData);
      this.createBarChart();
    });
  }

  requestReport() {
    return this.http.get<string>(
      'https://stormy-dawn-15351.herokuapp.com/attacksReport?day=' + this.currentDate + '&' + 'uuid=' + this.userID ,
      {responseType: 'text' as 'json' });
  }


  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.dateList,
        datasets: [{
          label: 'nums',
          data: this.reportData,
          backgroundColor: 'rgb(38, 194, 129)',
          borderColor: 'rgb(38, 194, 129)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
