import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';


import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexOptions,
  ApexXAxis,
  ApexStates
 
} from "ng-apexcharts";
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';
import { FormGroup, FormControl } from '@angular/forms';
import { animation } from '@angular/animations';



export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  options:ApexOptions;
  title: ApexTitleSubtitle;
  xaxis:ApexXAxis;
  states:ApexStates;
  
};

@Component({
  selector: 'app-district-data',
  templateUrl: './district-data.component.html',
  styleUrls: ['./district-data.component.css']
})
export class DistrictDataComponent implements OnInit {

  @ViewChild(SelectAutocompleteComponent) multiSelect: SelectAutocompleteComponent;

  warningMessage: string = '';
  districtResponse: any = [];
  filteredDataSource: any = [];
  apexDistrict: any = [];
  apexStatus: any = [];
  apexChc: any = [];
  apexPhc: any = [];
  apexSc: any = [];
  apexAnm:any = [];
  resDistrict: any = [];
  resChc: any = [];
  resPhc: any = [];
  resSc: any = [];
  resAnm: any = [];
  selectedDistrict: any = [];
  ok:any = [];
  barcodedamaged: any = [];
  sampledamaged: any = [];
  sampletimeout: any = [];
  drpDistrict: string;
  dropdownSettings ={};
  districtOptions = [];
  chcOptions = [];
  phcOptions = [];
  scOptions = [];
  anmOptions = [];
  statusOptions = [];
  chartType = [
    {display:'Bar', value:'Bar'},
    {display:'Line', value:'Line'},
    {display:'Stack', value:'Stack'},
  ];
  

  @ViewChild("chart")chart:ChartComponent;
  public chartOptions:Partial<any>;

  selectedDistrictOptions = [];
  selectedChcOptions = [];
  selectedPhcOptions = [];
  selectedScOptions = [];
  selectedAnmOptions = [];
  selectedStatusOptions = [];
  selectedChartOptions=[];
  selected_district = this.selectedDistrictOptions;
  selected_chc = this.selectedChcOptions;
  selected_phc = this.selectedPhcOptions;
  selected_sc =  this.selectedScOptions;
  selected_anm = this.selectedAnmOptions;
  selected_status = this.selectedStatusOptions;
  selected_chart: string = 'bar'; //this.selectedChartOptions;
  isStack: boolean = false;

  profileForm = new FormGroup({
    selected_district: new FormControl([]),
    selected_chc: new FormControl([]),
    selected_phc: new FormControl([]),
    selected_sc: new FormControl([]),
    selected_anm: new FormControl([]),
    selected_status: new FormControl([]),
    selected_chart: new FormControl([])
  });
  
  constructor(private http:HttpClient) { 
    this.renderChart();
  }

 

  data: any = [];


  ngOnInit(): void {
    this.warningMessage = '';
    this.apexDistrict = [];
    this.apexStatus = [];
    this.apexChc = [];
    this.apexPhc = [];
    this.apexSc = [];
    this.apexAnm = [];

    this.http.get('./assets/district-data.json', { responseType: 'json' }).subscribe(

      (res: any) => {
        this.districtResponse = res;
        let district = res['data'].map(res => res.District)
        let sample_status = res['data'].map(res => res.CHC_Sample_Status)
        let chc = res['data'].map(res => res.CHC)
        let phc = res['data'].map(res => res.PHC)
        let sc = res['data'].map(res => res.SC)
        let anm = res['data'].map(res => res.ANM)
        this.warningMessage = '';

        console.log(district);
        this.apexDistrict = district;

        console.log(sample_status);
        this.apexStatus = sample_status;

        console.log(chc);
        this.apexChc = chc;

        console.log(phc);
        this.apexPhc = phc;

        console.log(sc);
        this.apexSc = sc;

        console.log(anm);
        this.apexAnm = anm;

        console.log(res);

        let tempArr = []; let tempArrMat = [];
        let tempArr1 = [];let tempArrChc = [];
        let tempArr2 = [];let tempArrPhc = [];
        let tempArr3 = [];let tempArrSc = [{display:'All SC', value:'All SC'}];
        let tempArr4 = [];let tempArrAnm = [{display:'All ANM', value: 'All ANM'}];
        let tempArr5 = []; let tempArrStatus = [];

        district.filter(function (item) {
          var i = tempArr.findIndex(x => x == item);
          if (i <= -1) {
            tempArr.push(item);
            tempArrMat.push({display: item, value: item});
          }
          return null;
        });
        this.selectedDistrictOptions = this.selected_district = tempArr;
        this.districtOptions = tempArrMat;

        sample_status.filter(function(item){
          var i = tempArr5.findIndex(x => x == item);
          if (i <= -1) {
            tempArr5.push(item);
            tempArrStatus.push({display: item, value: item});
          }
          return null;
        });
        this.selectedStatusOptions = tempArr5;
        this.statusOptions = tempArrStatus;

        chc.filter(function (item) {
          var i = tempArr1.findIndex(x => x == item);
          if (i <= -1) {
            tempArr1.push(item);
            tempArrChc.push({display:item, value:item});
          }
          return null;
        });
        this.selectedChcOptions = tempArr1;
        this.chcOptions = tempArrChc;

        phc.filter(function (item) {
          var i = tempArr2.findIndex(x => x == item);
          if (i <= -1) {
            tempArr2.push(item);
            tempArrPhc.push({display:item, value:item});
          }
          return null;
        });
        this.selectedPhcOptions = tempArr2;
        this.phcOptions = tempArrPhc;

        sc.filter(function (item) {
          var i = tempArr3.findIndex(x => x == item);
          if (i <= -1) {
            tempArr3.push(item);
            tempArrSc.push({display:item, value:item});
          }
          return null;
        });
        this.selectedScOptions = tempArr3;
        this.scOptions = tempArrSc;

        anm.filter(function (item) {
          var i = tempArr4.findIndex(x => x == item);
          if (i <= -1) {
            tempArr4.push(item);
            tempArrAnm.push({display:item, value:item});
          }
          return null;
        });
        this.selectedAnmOptions = tempArr4;
        this.anmOptions = tempArrAnm;

        this.warningMessage = '';
        this.resDistrict = tempArr;
        console.log(this.resDistrict);
        this.populateChartData(this.resDistrict);
       
        this.resChc = tempArr1;
        console.log(this.resChc);
      
        this.resPhc = tempArr2;
        console.log(this.resPhc);
        
        this.resSc = tempArr3;
        console.log(this.resSc);

        this.resAnm = tempArr4;
        console.log(this.resAnm);

      },
       (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );

  
  }
  
 

  popupateFilteredChart(event){
    // all - all district
    //partial - partial district
    let districts = [];
    console.log(event.target.value);
    districts.push(event.target.value);
    this.populateChartData(districts);
    
  }

  populateChartData(districts: any[]){
    this.clearChartData();
    //if(chc1.value  !== ''){
    //  let chc1 = this.districtResponse.filter(x => x.chc === 'chc1');
    //}
    districts.forEach(element => {
      let statusData = this.districtResponse.data.filter(x => x.District === element);
      this.filteredDataSource = this.filteredDataSource.concat(statusData);
      let okStatus = statusData.filter(x => x.CHC_Sample_Status === 'OK');
      let barcodeDamagedStatus = statusData.filter(x => x.CHC_Sample_Status === 'Barcode Damaged');
      let sampledDamagedStatus = statusData.filter(x => x.CHC_Sample_Status === 'Sample Damaged');
      let sampledTimeoutStatus = statusData.filter(x => x.CHC_Sample_Status === 'Sample Timeout');
      this.ok.push(okStatus.length);
      this.barcodedamaged.push(barcodeDamagedStatus.length);
      this.sampledamaged.push(sampledDamagedStatus.length);
      this.sampletimeout.push(sampledTimeoutStatus.length);
    });
    this.selectedDistrict = districts;
    this.renderChart();
  }

  clearChartData(){
    this.ok = [];
    this.barcodedamaged = [];
    this.sampledamaged = [];
    this.sampletimeout = [];
    this.selectedDistrict = [];
    this.selected_chc = [];
    this.selected_phc = [];
    this.selected_sc = [];
    this.selected_anm = [];
    this.selected_status = [];
   
  }

  renderChart(){
    this.chartOptions = {
      series:
        [
         {
            name: "Ok",
            responsive: 'true',
            data: this.ok
         },
          {
            name: "Barcode Damaged",
            responsive: 'true',
            data: this.barcodedamaged
  
          },
          {
            name: "Sample Damaged",
            responsive: 'true',
            data: this.sampledamaged
          },
          {
            name: "Sample Timeout",
            responsive: 'true',
            data: this.sampletimeout
  
          }
        ],
      chart:
      {
        height: 400,
        width: 700,
        background: 'white',
        type: this.selected_chart,
        stacked: this.isStack
  
      },
      title:
      {
        text: "District-Data"
         
      },
      xaxis:
      {
        categories: this.selectedDistrict
  
      },
      states:{
        active: {
          allowMultipleDataPointsSelection: true,
          filter: {
              type: 'darken',
              value: 0.35,
          },
      },
      }
    }        
  }

  getSelectedChartOptions(selected: any) {
    if (selected.length > 0) {
      if(selected.toLowerCase() === 'stack'){
        this.selected_chart = 'bar';
        this.isStack = true;
      }
      else{
        this.selected_chart = selected.toLowerCase();
        this.isStack = false;
      }
      console.log(this.selected_chart);
      this.renderChart();
    }
  }


  
  getSelectedDistrictsOptions(selected) {
    if(this.selectedDistrictOptions.length <=0 ) return;
    this.warningMessage = '';
    this.selected_district = selected;
    //this.selectedDistrictOptions = selected;
    console.log(this.selected_district);
    if (this.selected_district.length > 0) {
      this.filterDistrictData(this.selected_district);
    }
    else {
      this.warningMessage = "At least one district has to be selected to draw chart";
      this.selected_district.push(this.selectedDistrictOptions[0]);
      this.filterDistrictData(this.selected_district);
     
    }
  }

  getSelectedStatusOptions(selected){
    this.warningMessage = '';
    this.selected_status = selected;
    console.log(this.selected_status);
    if(this.selected_status.length > 0){
      this.filterStatusData(this.selected_district,this.selected_status);
    }
    else{
      this.warningMessage = "At least one Status has to be selected to draw chart";
      }
     }

  getSelectedChcOptions(selected){
    this.warningMessage = '';
    this.selected_chc = selected;
    console.log(this.selected_chc);

    if(this.selected_chc.length > 0) {
      this.filterChcData(this.selected_district, this.selected_chc);
   }
   else{
    this.warningMessage = "At least one CHC has to be selected to draw chart";
   }
  }


  getSelectedPhcOptions(selected) {
    this.warningMessage = '';
    this.selected_phc = selected;
    console.log(this.selected_phc);
    if (this.selected_phc.length > 0) {
      //this.populateChartData(this.selected_district);
      this.filterPhcData(this.selected_district, this.selected_phc)
    }
    else {
      this.warningMessage = "At least one PHC has to be selected to draw chart";
    }
  }

  getSelectedScOptions(selected) {
    this.warningMessage = '';
    this.selected_sc = selected;
    console.log(this.selected_sc);
    if (this.selected_sc.length > 0) {
      //this.populateChartData(this.selected_district);
      this.filterScData(this.selected_district, this.selected_sc)
    }
    else {
      this.warningMessage = "At least one SC has to be selected to draw chart";
    }
  }

  getSelectedAnmOptions(selected) {
    this.warningMessage = '';
    this.selected_anm = selected;
    console.log(this.selected_anm);
    if (this.selected_anm.length > 0) {
      //this.populateChartData(this.selected_district);
      this.filterAnmData(this.selected_district, this.selected_anm)
    }
    else {
      this.warningMessage = "At least one ANM has to be selected to draw chart";
    }
  }



  filterDistrictData(districts){
    let districtSource = [];
    districts.sort((a,b) => a.localeCompare(b));
    //filter by selected district
    districts.forEach(element => {
      districtSource = districtSource.concat(this.districtResponse.data.filter(x => x.District === element));
    });
    this.filteredDataSource = districtSource;
    let chc = districtSource.map(res => res.CHC);
    let phc = districtSource.map(res => res.PHC);
    let sc = districtSource.map(res => res.SC);
    let anm = districtSource.map(res => res.ANM);
    let statusdata = districtSource.map(res => res.CHC_Sample_Status);
    this.getUniniqueChc(chc);
    this.getUniniquePhc(phc);
    this.getUniniqueSc(sc);
    this.getUniniqueAnm(anm);
    this.getUniqueStatus(statusdata);
    this.PrepareChartData(districtSource, districts);
  }

  filterChcData(districts, chcs){
    let districtSource = [];

    chcs.forEach(element => {
       districtSource = districtSource.concat(this.filteredDataSource.filter(x => x.CHC === element));
    });
    //this.filteredDataSource = districtSource;
    let phc = districtSource.map(res => res.PHC);
    let sc = districtSource.map(res => res.SC);
    let anm = districtSource.map(res => res.ANM);
    let statusdata = districtSource.map(res => res.CHC_Sample_Status);
    this.getUniniquePhc(phc);
    this.getUniniqueSc(sc);
    this.getUniniqueAnm(anm);
    this.getUniqueStatus(statusdata);
    this.PrepareChartData(districtSource, districts);
  }

  filterPhcData(districts, phcs){
    let districtSource = [];

    phcs.forEach(element => {
       districtSource = districtSource.concat(this.filteredDataSource.filter(x => x.PHC === element));
    });
    //this.filteredDataSource = districtSource;
    let sc = districtSource.map(res => res.SC);
    let anm = districtSource.map(res => res.ANM);
    let statusdata = districtSource.map(res => res.CHC_Sample_Status);
    this.getUniniqueSc(sc);
    this.getUniniqueAnm(anm);
    this.getUniqueStatus(statusdata);
    this.PrepareChartData(districtSource, districts);
  }

  filterScData(districts, scs){
    let districtSource = [];
  
      if(scs != 'All SC'){
         districtSource = districtSource.concat(this.filteredDataSource.filter(x => x.SC === scs));
      }
      else{
         districtSource = this.filteredDataSource;
      }
        
    //this.filteredDataSource = districtSource;
    // let sc = districtSource.map(res => res.SC);
    let anm = districtSource.map(res => res.ANM);
    let statusdata = districtSource.map(res => res.CHC_Sample_Status);
    // this.getUniniqueSc(sc);
    this.getUniniqueAnm(anm);
    this.getUniqueStatus(statusdata);
    this.PrepareChartData(districtSource, districts);
  }
  filterAnmData(districts, anms){
    let districtSource = [];
   
      if(anms != 'All ANM'){
       districtSource = districtSource.concat(this.filteredDataSource.filter(x => x.ANM === anms));
      }else{
        districtSource = this.filteredDataSource;
      }
    //this.filteredDataSource = districtSource;
    // let anm = districtSource.map(res => res.ANM);
    let statusdata = districtSource.map(res => res.CHC_Sample_Status);
    // this.getUniniqueAnm(anm);
    this.getUniqueStatus(statusdata);
    this.PrepareChartData(districtSource, districts);
  }
  filterStatusData(districts, status){
    let districtSource = [];
    status.forEach(element => {
      districtSource = districtSource.concat(this.filteredDataSource.filter(x => x.CHC_Sample_Status === element));
    });
   
    // let statusdata = districtSource.map(res => res.CHC_Sample_Status);
    // this.getUniqueStatus(statusdata);
    this.PrepareChartData(districtSource,districts);
  }

  getUniqueDistrict(){
    let district = this.districtResponse.data.map(res => res.District);
    var tempArr = [];
    var tempArrMat = [];
    district.filter(function (item) {
      var i = tempArr.findIndex(x => x == item);
      if (i <= -1) {
        tempArr.push(item);
        tempArrMat.push({display: item, value: item});
      }
      return null;
    });
    this.selectedDistrictOptions = this.selected_district = tempArr;
    this.districtOptions = tempArrMat;    
  }


  getUniniqueChc(chc){
    let tempChcArr = []; let tempChcDisplay = [];
    chc.filter(function (item) {
      var i = tempChcArr.findIndex(x => x == item);
      if (i <= -1) {
        tempChcArr.push(item);
        tempChcDisplay.push({display:item, value:item});
      }
      return null;
    });
    this.selectedChcOptions = tempChcArr;
    this.chcOptions = tempChcDisplay;

  }

  getUniniquePhc(phc) {
    let tempPhcArr = []; let tempPhcDisplay = [];
    phc.filter(function (item) {
      var i = tempPhcArr.findIndex(x => x == item);
      if (i <= -1) {
        tempPhcArr.push(item);
        tempPhcDisplay.push({ display: item, value: item });
      }
      return null;
    });
    this.selectedPhcOptions = tempPhcArr;
    this.phcOptions = tempPhcDisplay;
  }

  getUniniqueSc(sc){
    let tempScArr = ['All SC']; let tempScDisplay = [{display:'All SC', value:'All SC'}];
    sc.filter(function (item) {
      var i = tempScArr.findIndex(x => x == item);
      if (i <= -1) {
        tempScArr.push(item);
        tempScDisplay.push({display:item, value:item});
      }
      return null;
    });
    this.selectedScOptions = tempScArr;
    this.scOptions = tempScDisplay;
  }

  getUniniqueAnm(anm){
    let tempAnmArr = ['All ANM']; let tempAnmDisplay = [{display:'All ANM',value:'All ANM'}];
    anm.filter(function (item) {
      var i = tempAnmArr.findIndex(x => x == item);
      if (i <= -1) {
        tempAnmArr.push(item);
        tempAnmDisplay.push({display:item,value:item});
      }
      return null;
    });
    this.selectedAnmOptions = tempAnmArr;
    this.anmOptions = tempAnmDisplay;
  }
  getUniqueStatus(status){
    let tempStatusArr = []; let tempStatusDisplay =[];
    status.filter(function (item) {
      var i = tempStatusArr.findIndex(x => x == item);
      if (i <= -1) {
        tempStatusArr.push(item);
        tempStatusDisplay.push({display:item,value:item});
      }
      return null;
    });
    this.selectedStatusOptions = tempStatusArr;
    this.statusOptions = tempStatusDisplay;
  }

  PrepareChartData(dataSource: any, districts: any){
    this.clearChartData();
    districts.forEach(element => {
      let statusData = dataSource.filter(x => x.District === element);
      let okStatus = statusData.filter(x => x.CHC_Sample_Status === 'OK');
      let barcodeDamagedStatus = statusData.filter(x => x.CHC_Sample_Status === 'Barcode Damaged');
      let sampledDamagedStatus = statusData.filter(x => x.CHC_Sample_Status === 'Sample Damaged');
      let sampledTimeoutStatus = statusData.filter(x => x.CHC_Sample_Status === 'Sample Timeout');
      this.ok.push(okStatus.length);
      this.barcodedamaged.push(barcodeDamagedStatus.length);
      this.sampledamaged.push(sampledDamagedStatus.length);
      this.sampletimeout.push(sampledTimeoutStatus.length);
    });
      this.selectedDistrict = districts;
    this.renderChart();
  }

  onResetSelection(){
    this.getUniqueDistrict();
    this.selectedChartOptions = ['bar'];
    this.selected_chart = 'bar';
    this.isStack = false;
    this.filterDistrictData(this.selectedDistrictOptions);
    //this.renderChart();
  }

}
