import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  maxMessageId: any;

  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;

    this.http
      .get<Message[]>(
        'http://localhost:3000/messages'
      )
        //success method

      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          messages.sort((a, b) => (a.id < b.id ? 1 : 0));
          this.messageChangedEvent.next(this.messages.slice());
        },
        //error method
        (error: any) => {
          console.log(error);
        }
      );
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
  addMessage(message: Message) {
    if (!document) {
      return;
    }

    // make sure id of the new Message is empty
    message.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, messages: Message }>('http://localhost:3000/messages',
      message,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new message to messages
          this.messages.push(responseData.messages);
          this.messages.sort((a, b) => (a.id < b.id ? 1 : 0));
        }
      );
  }
  getMaxId() {
    let maxId = 0;

    for (let message of this.messages) {
      let currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
  }
  storeMessages() {
    const messages = JSON.stringify(this.messages.slice());
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    this.http
      .put<Message[]>(
        'https://jessegj-cmsproject-default-rtdb.firebaseio.com/messages.json',
        this.messages)
      .subscribe(() => {
        this.messageChangedEvent.next(this.messages.slice());
      });
  }
}
