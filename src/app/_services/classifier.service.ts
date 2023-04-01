import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Model } from '../_models/model';
import { Prediction } from '../_models/prediction';

@Injectable({
  providedIn: 'root',
})
export class ClassifierService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getNaiveModel() {
    return this.http.get<Model>(this.baseUrl + 'naive-bayes/model');
  }

  getLogisticModel() {
    return this.http.get<Model>(this.baseUrl + 'logistic-regression/model');
  }

  getNaivePrediction(message: string) {
    return this.http.get<Prediction>(
      this.baseUrl + 'naive-bayes/predict/' + message
    );
  }

  getLogisticPrediction(message: string) {
    return this.http.get<Prediction>(
      this.baseUrl + 'logistic-regression/predict/' + message
    );
  }
}
