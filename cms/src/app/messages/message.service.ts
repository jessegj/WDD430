import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message[] = [];

  constructor() {
    this.messages = MOCKMESSAGES;
   }
   getMessages(): Message[] {
    return this.messages;
  }

  getMessage(id: string): Message | null {
    for (let message of this.messages) {
      if (message.id == id) {
        return message;
      }
    }
    return null;
  }
}
