import { Injectable } from '@angular/core';
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
      if (mesage.id == id) {
        return message;
      }
    }
    return null;
  }
}
