import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '234e75077576198c97115602bf8a53c7'; // Aquí coloca la clave API que obtengas del proveedor
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor() {}

  async getWeather(city: string) {
    const response = await axios.get(`${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`);
    return response.data;
  }
}