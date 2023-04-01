import { Component, Input } from '@angular/core';
import { Colors } from '../_models/colors';

@Component({
  selector: 'app-prediction-result',
  templateUrl: './prediction-result.component.html',
  styleUrls: ['./prediction-result.component.scss'],
})
export class PredictionResultComponent {
  @Input() isSpam: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() left: boolean = false;
  @Input() right: boolean = false;
  colors = Colors;
}
