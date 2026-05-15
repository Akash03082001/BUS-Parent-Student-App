import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth';
import { Chart } from 'chart.js/auto';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
  standalone: true
})
export class AdminDashboard implements OnInit {

  totalParents = 0;
  totalStudents = 0;
  maleCount = 0;
  femaleCount = 0;
  parentsWithChildren = 0;

  private chart: any;  
  

  constructor(
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {

    const role = localStorage.getItem('role');

    if (role !== 'ADMIN') {
      this.router.navigate(['/dashboard']);
    }

    this.loadDashboard();
  }

  loadDashboard() {

    // ✅ Total parents
    this.authService.getTotalParents().subscribe(res => {
      console.log("PARENTS API RESPONSE:", res); 
      this.totalParents = Number(res);     // ✅ ensure number
      this.cdr.detectChanges();  

    });

    // ✅ Total students
    this.authService.getTotalStudents().subscribe(res => {
      this.totalStudents = Number(res);
      this.cdr.detectChanges()

    });

    // ✅ Parents with children
    this.authService.getParentsWithChildren().subscribe(res => {
      this.parentsWithChildren = Number(res);
      this.cdr.detectChanges();

    });

    // ✅ Gender stats
    this.authService.getGenderStats().subscribe(res => {
      this.maleCount = Number(res.male ?? 0);
      this.femaleCount = Number(res.female ?? 0);

      this.cdr.detectChanges();

      setTimeout(() => this.loadChart(), 50);

    });
  }


loadChart() {
const canvas = document.getElementById("genderChart") as HTMLCanvasElement;

  if (!canvas) return;

 
// ✅ Destroy old chart to prevent stacking/scroll issues
    if (this.chart) {
      this.chart.destroy();
    }


  this.chart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: ['Male', 'Female'],
      datasets: [{
        data: [this.maleCount, this.femaleCount],
        backgroundColor: ['#2563eb', '#ec4899']
      }]
    },
    options: {
      responsive: true,

      maintainAspectRatio: true,   // ✅ FIXED (IMPORTANT)

      aspectRatio: 1.2,            // ✅ control size

      plugins: {
        legend: {
          position: 'top'
        }
      }
    }
  });
}





  
}
