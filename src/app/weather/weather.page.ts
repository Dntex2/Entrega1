import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {
  weatherData: any;
  city: string = 'Santiago'; // Puedes cambiar esto o hacer que sea dinámico desde un input

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getWeather();
  }

  async getWeather() {
    try {
      this.weatherData = await this.weatherService.getWeather(this.city);
    } catch (error) {
      console.error('Error al obtener los datos del clima', error);
    }
  }
}
