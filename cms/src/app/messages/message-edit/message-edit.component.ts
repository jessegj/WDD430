import { Component, OnInit, ViewChild,ElementRef, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;

  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = 'Jesse Jensen';

  constructor() { }

  ngOnInit(): void {
  }
  onSendMessage() {
    const textMsg = this.msgTextRef.nativeElement.value;
    const msgSubject = this.subjectRef.nativeElement.value;
    const newMessage = new Message('1', this.currentSender, textMsg, msgSubject);
    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    this.msgTextRef.nativeElement.value = "";
    this.subjectRef.nativeElement.vlaue = "";
  }

}
