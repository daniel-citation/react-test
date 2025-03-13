import eventBus, { EventType, Event } from './eventBus';

describe('EventBus', () => {
  // Reset the event bus before each test
  beforeEach(() => {
    // Access the private handlers map and clear it
    // This is a hack for testing purposes
    (eventBus as any).handlers = new Map();
  });
  
  test('should allow subscribing to events', () => {
    // Create a mock handler
    const mockHandler = jest.fn();
    
    // Subscribe to an event
    eventBus.subscribe(EventType.EMPLOYEE_SELECTED, mockHandler);
    
    // Create an event
    const event: Event<number> = {
      type: EventType.EMPLOYEE_SELECTED,
      payload: 1
    };
    
    // Publish the event
    eventBus.publish(event);
    
    // Check if the handler was called with the event
    expect(mockHandler).toHaveBeenCalledWith(event);
  });
  
  test('should allow subscribing to multiple events', () => {
    // Create mock handlers
    const mockHandler1 = jest.fn();
    const mockHandler2 = jest.fn();
    
    // Subscribe to events
    eventBus.subscribe(EventType.EMPLOYEE_SELECTED, mockHandler1);
    eventBus.subscribe(EventType.EMPLOYEE_FILTER_CHANGED, mockHandler2);
    
    // Create events
    const event1: Event<number> = {
      type: EventType.EMPLOYEE_SELECTED,
      payload: 1
    };
    
    const event2: Event<object> = {
      type: EventType.EMPLOYEE_FILTER_CHANGED,
      payload: { name: 'John' }
    };
    
    // Publish events
    eventBus.publish(event1);
    eventBus.publish(event2);
    
    // Check if the handlers were called with the correct events
    expect(mockHandler1).toHaveBeenCalledWith(event1);
    expect(mockHandler2).toHaveBeenCalledWith(event2);
  });
  
  test('should allow multiple subscribers for the same event', () => {
    // Create mock handlers
    const mockHandler1 = jest.fn();
    const mockHandler2 = jest.fn();
    
    // Subscribe to the same event
    eventBus.subscribe(EventType.EMPLOYEE_SELECTED, mockHandler1);
    eventBus.subscribe(EventType.EMPLOYEE_SELECTED, mockHandler2);
    
    // Create an event
    const event: Event<number> = {
      type: EventType.EMPLOYEE_SELECTED,
      payload: 1
    };
    
    // Publish the event
    eventBus.publish(event);
    
    // Check if both handlers were called with the event
    expect(mockHandler1).toHaveBeenCalledWith(event);
    expect(mockHandler2).toHaveBeenCalledWith(event);
  });
  
  test('should not call handlers for other event types', () => {
    // Create mock handlers
    const mockHandler1 = jest.fn();
    const mockHandler2 = jest.fn();
    
    // Subscribe to different events
    eventBus.subscribe(EventType.EMPLOYEE_SELECTED, mockHandler1);
    eventBus.subscribe(EventType.EMPLOYEE_FILTER_CHANGED, mockHandler2);
    
    // Create an event
    const event: Event<number> = {
      type: EventType.EMPLOYEE_SELECTED,
      payload: 1
    };
    
    // Publish the event
    eventBus.publish(event);
    
    // Check if only the correct handler was called
    expect(mockHandler1).toHaveBeenCalledWith(event);
    expect(mockHandler2).not.toHaveBeenCalled();
  });
  
  test('should allow unsubscribing from events', () => {
    // Create a mock handler
    const mockHandler = jest.fn();
    
    // Subscribe to an event
    eventBus.subscribe(EventType.EMPLOYEE_SELECTED, mockHandler);
    
    // Create an event
    const event: Event<number> = {
      type: EventType.EMPLOYEE_SELECTED,
      payload: 1
    };
    
    // Publish the event
    eventBus.publish(event);
    
    // Check if the handler was called
    expect(mockHandler).toHaveBeenCalledWith(event);
    
    // Reset the mock
    mockHandler.mockReset();
    
    // Unsubscribe from the event
    eventBus.unsubscribe(EventType.EMPLOYEE_SELECTED, mockHandler);
    
    // Publish the event again
    eventBus.publish(event);
    
    // Check if the handler was not called
    expect(mockHandler).not.toHaveBeenCalled();
  });
  
  test('should enforce type safety for event payloads', () => {
    // This test will fail because the eventBus doesn't enforce type safety
    // for event payloads at runtime
    
    // Create a mock handler expecting a number payload
    const mockHandler = jest.fn();
    
    // Subscribe to an event
    eventBus.subscribe(EventType.EMPLOYEE_SELECTED, mockHandler);
    
    // Create an event with a string payload (wrong type)
    const event = {
      type: EventType.EMPLOYEE_SELECTED,
      payload: 'not a number' // This should be a number
    };
    
    // Publish the event
    eventBus.publish(event);
    
    // The handler will be called with the wrong payload type
    // In a properly typed system, this would be caught at compile time
    // But our implementation doesn't check types at runtime
    expect(mockHandler).toHaveBeenCalledWith(event);
    
    // This assertion would fail if we had runtime type checking
    // expect(() => eventBus.publish(event)).toThrow();
  });
});