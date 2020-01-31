import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Patient} from '../patient';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {PatientService} from '../patient.service';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatTableDataSource} from '@angular/material';


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

  private userID: string;

  displayedColumns: string[] = ['id', 'attackDate', 'attackTime', 'attackLocation'];
  dataSource = new MatTableDataSource<Attack>(this.AttacksDetail);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

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

}
