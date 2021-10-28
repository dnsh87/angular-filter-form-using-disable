import {
  Component,
  ChangeDetectionStrategy,
  NgZone,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

// import { ActivityList } from './app.component';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular';
  toggle = [];
  @ViewChildren('fil') ref: QueryList<ElementRef>;
  data = {
    ProgramId: 'd9c35253-97c4-45e1-81a9-d4863a94d724',
    TermCtr: '5',
    ActivityList: [
      {
        IsSelected: false,
        CountryList: [
          {
            CountryName: 'CHAD',
            IsCountrySelected: false,
            PCOTID: 'fa615209-58f3-43b5-972d-6bbf83f12212',
          },
          {
            CountryName: 'PROGRAM',
            IsCountrySelected: false,
            PCOTID: 'a257c4bd-47bc-4d84-b32f-31e4afb6789e',
          },
        ],
        TaskCode: 'INV',
        TaskDescription: 'Invoicing',
      },
      {
        IsSelected: false,
        CountryList: [
          {
            CountryName: 'CHAD',
            IsCountrySelected: false,
            PCOTID: '8153ee8a-cc07-4158-a288-e919305b10aa',
          },
          {
            CountryName: 'KAZAKHSTAN',
            IsCountrySelected: false,
            PCOTID: '6227abbd-0e61-46d8-b592-12943dc86c4c',
          },
        ],
        TaskCode: 'LP',
        TaskDescription: 'Local Policy',
      },
      {
        IsSelected: false,
        TaskCode: 'demo 3',
        TaskDescription: 'Demo3',
        CountryList: [
          {
            CountryName: 'CAMEROON',
            IsCountrySelected: false,
            PCOTID: 'd1112bb6-268b-4e24-bb4c-7916c9a56f90',
          },
          {
            CountryName: 'CHAD',
            IsCountrySelected: false,
            PCOTID: '09817c4a-e089-49da-9ce4-97ee308246cd',
          },
          {
            CountryName: 'EQUATORIAL GUINEA',
            IsCountrySelected: false,
            PCOTID: '2fc36a50-b9bf-472e-8361-ede47737ac55',
          },
          {
            CountryName: 'GHANA',
            IsCountrySelected: false,
            PCOTID: 'db576b3e-01b5-4c57-b2dd-4bcdf6cbfbe4',
          },
          {
            CountryName: 'INDIA',
            IsCountrySelected: false,
            PCOTID: '410acd2a-3500-4e05-8ddb-29727e56f93d',
          },
          {
            CountryName: 'UNITED KINGDOM',
            IsCountrySelected: false,
            PCOTID: 'b13e4cc2-7ae4-4db0-88f4-a3686dce5c73',
          },
        ],
      },
    ],
  };
  search = new FormControl({ disabled: false, value: '' });
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private zone: NgZone,
    private render: Renderer2
  ) {
    this.form = this.fb.group({
      ActivityList: this.fb.array(this.buildFormArray()),
    });

    this.form.get('ActivityList').disable;
  }

  get ActivityList() {
    return this.form.get('ActivityList')['controls'];
  }

  buildFormArray() {
    let { ActivityList } = this.data;
    let obj1 = ActivityList.map((d, i) => {
      return {
        name: i,
      };
    });
    let array = [];
    let f: FormGroup;
    for (let activity of ActivityList) {
      this.toggle.push(true);
      let { IsSelected, TaskDescription, CountryList } = activity;
      f = this.fb.group({
        IsSelected: IsSelected,
        TaskDescription: TaskDescription,
        CountryList: this.fb.array(this.buildArray(CountryList)),
      });
      array.push(f);
    }

    return array;
  }

  buildArray(CountryList) {
    let countryList = [];
    return CountryList.map((country) => {
      return this.fb.group({
        CountryName: { disabled: false, value: country['CountryName'] },
        IsCountrySelected: {
          disabled: false,
          value: country['IsCountrySelected'],
        },
      });
    });
  }

  ngOnInit() {
    let inde = null;
    this.search.valueChanges.subscribe((change) => {
      let check = this.form
        .getRawValue()
        .ActivityList.filter((value, index) => {
          console.log(
            value['TaskDescription']
              .toLowerCase()
              .indexOf(change.toLowerCase()) < 0
          );
          if (
            change.length > 0 &&
            value['TaskDescription']
              .toLowerCase()
              .indexOf(change.toLowerCase()) < 0
          ) {
            this.form.get('ActivityList')['at'](index).disable();
            this.form.updateValueAndValidity();
            this.toggle[index] = false;
          } else if (
            value['TaskDescription']
              .toLowerCase()
              .indexOf(change.toLowerCase()) > -1
          ) {
            this.toggle[index] = true;
            this.form.get('ActivityList')['at'](index).enable();
          }
          return (
            value['TaskDescription']
              .toLowerCase()
              .indexOf(change.toLowerCase()) > -1
          );
        });
    });
  }
}
