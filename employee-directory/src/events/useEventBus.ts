import { useEffect, useCallback } from 'react';
import eventBus, { EventType, Event, EventHandler } from './eventBus';

// Custom hook for using the event bus
export const useEventBus = () => {
  // Subscribe to an event
  const subscribe = useCallback(<T>(eventType: EventType, handler: EventHandler<T>) => {
    eventBus.subscribe(eventType, handler);
    
    // Return unsubscribe function
    return () => {
      eventBus.unsubscribe(eventType, handler);
    };
  }, []);

  // Publish an event
  const publish = useCallback(<T>(event: Event<T>) => {
    eventBus.publish(event);
  }, []);

  return {
    subscribe,
    publish
  };
};

// Custom hook for subscribing to a specific event
export const useEventSubscription = <T>(eventType: EventType, handler: EventHandler<T>) => {
  useEffect(() => {
    eventBus.subscribe(eventType, handler);
  });
};

// Custom hook for publishing events of a specific type
export const useEventPublisher = <T>(eventType: EventType) => {
  const publish = useCallback((payload: T) => {
    eventBus.publish({
      type: eventType,
      payload
    });
  }, [eventType]);

  return publish;
};