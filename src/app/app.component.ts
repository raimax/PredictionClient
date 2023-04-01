import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Colors } from './_models/colors';
import { Model } from './_models/model';
import { Prediction } from './_models/prediction';
import { ClassifierService } from './_services/classifier.service';
import { examples } from './_data/examples';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  naiveModel: Model | null = null;
  logisticModel: Model | null = null;
  naivePrediction: Prediction | null = null;
  logisticPrediction: Prediction | null = null;
  colors = Colors;
  isNaiveLoading: boolean = false;
  isLogisticLoading: boolean = false;

  predictionForm = this.fb.group({
    message: ['', [Validators.required]],
  });

  constructor(private classifier: ClassifierService, private fb: FormBuilder) {}

  ngOnInit() {
    this.getNaiveModel();
    this.getLogisticModel();
  }

  getNaiveModel() {
    this.classifier.getNaiveModel().subscribe({
      next: (response) => {
        this.naiveModel = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getLogisticModel() {
    this.classifier.getLogisticModel().subscribe({
      next: (response) => {
        this.logisticModel = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getNaivePrediction() {
    this.isNaiveLoading = true;
    this.classifier.getNaivePrediction(this.getMessage()).subscribe({
      next: (response) => {
        this.naivePrediction = response;
        this.isNaiveLoading = false;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getLogisticPrediction() {
    this.isLogisticLoading = true;
    this.classifier.getLogisticPrediction(this.getMessage()).subscribe({
      next: (response) => {
        this.logisticPrediction = response;
        this.isLogisticLoading = false;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getPredictions() {
    this.getNaivePrediction();
    this.getLogisticPrediction();
  }

  getMessage() {
    return this.predictionForm.get('message')?.value || '';
  }

  setMessage(message: string) {
    this.predictionForm.get('message')?.setValue(message);
  }

  reset() {
    this.naivePrediction = null;
    this.logisticPrediction = null;
  }

  loadExample(number: number) {
    this.setMessage(examples[number]);
  }

  onEnterKeyPressed(event: any) {
    event.preventDefault();
    if (this.getMessage() === '') return;
    this.getPredictions();
  }
}
