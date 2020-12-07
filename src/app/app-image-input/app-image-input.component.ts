import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-base-sixty-four-input',
  templateUrl: './app-image-input.component.html',
  styleUrls: ['./app-image-input.component.sass']
})

export class AppImageInputComponent implements OnInit {
  private base64textString = '';
  private fileType = '';
  @Input() error: boolean;
  @Input() img: string;
  @Output() imgChanged: EventEmitter<string> = new EventEmitter();
  @Output() isError: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if (this.img) {
      this.base64textString = this.img;
      this.error = false;
    }
  }
  private onChange(event) {
    const newValue = event.target.value;
    if (!newValue) {
      this.error = true;
      this.isError.emit(this.error);
    } else {
      this.error = false;
      this.isError.emit(this.error);
    }
  }
  handleFileSelect(evt) {
    const files = evt.target.files;
    const file = files[0];
    if (files && file) {
      const reader = new FileReader();
      this.fileType = file.type;
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.img = 'data:' + this.fileType + ';base64,' + this.base64textString;
    this.imgChanged.emit(this.img);
    this.error = false;
  }
}

