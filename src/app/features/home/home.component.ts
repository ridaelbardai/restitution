import { Component, OnInit } from '@angular/core';
import { userDetails } from 'src/app/core/models/responses/userDetails';
import { AxiosService } from 'src/app/core/services/axios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private axiosService: AxiosService) {}
  
  user!:userDetails;

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    this.axiosService.get<any>('/adherent/GetAdherentDetails')
    .then((response:any) => {
        console.log(response.data);
        this.user = response.data
    })
    .catch((error:any) => {
      console.error('Error fetching user details:', error);
    });
  }
}
