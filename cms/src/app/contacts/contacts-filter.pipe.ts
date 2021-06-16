import { Pipe, PipeTransform } from '@angular/core';
import { ContactModel } from './contact.model';

@Pipe({
  name: 'contactsFilter',
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: ContactModel[], term: string): any {
    let filterContacts: ContactModel[] = [];
    if (term && term.length > 0) {
      filterContacts = contacts.filter((contact: ContactModel) =>
        contact.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
      );
    }
    if (filterContacts.length < 1) {
      return contacts;
    }
    return filterContacts;
  }
}
