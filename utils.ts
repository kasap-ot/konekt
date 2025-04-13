import { CreateEvent, EventCategory, User } from "types";

export function defaultEvent(user?: User): CreateEvent {
    const category: EventCategory = 'Party';
    const event =  {
        title: '',
        locationName: '',
        locationUrl: '',
        organizer: '',
        description: '',
        category: category,
        imagePath: null,
        userId: user?.$id || '',
        dateTime: '',
      }
    return event;
}