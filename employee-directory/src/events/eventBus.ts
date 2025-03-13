// Event types
export enum EventType {
  EMPLOYEE_SELECTED = 'EMPLOYEE_SELECTED',
  EMPLOYEE_FILTER_CHANGED = 'EMPLOYEE_FILTER_CHANGED',
  EMPLOYEE_LIST_UPDATED = 'EMPLOYEE_LIST_UPDATED',
}

// Event interface
export interface Event<T = any> {
  type: EventType;
  payload: T;
}

// Event handler type
export type EventHandler<T = any> = (event: Event<T>) => void;

class EventBus {
  private handlers: Map<EventType, EventHandler[]> = new Map();

  // Subscribe to an event
  subscribe<T>(eventType: EventType, handler: EventHandler<T>): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    
    const eventHandlers = this.handlers.get(eventType);
    if (eventHandlers) {
      eventHandlers.push(handler);
    }
  }

  // Publish an event
  publish<T>(event: Event<T>): void {
    const eventHandlers = this.handlers.get(event.type);
    
    if (eventHandlers) {
      eventHandlers.forEach(handler => handler(event));
    }
  }

  // Unsubscribe from an event
  unsubscribe<T>(eventType: EventType, handler: EventHandler<T>): void {
    const eventHandlers = this.handlers.get(eventType);
    
    if (eventHandlers) {
      const index = eventHandlers.indexOf(handler as EventHandler);
      if (index !== -1) {
        eventHandlers.splice(index, 1);
      }
    }
  }
}

// Create a singleton instance
const eventBus = new EventBus();
export default eventBus;