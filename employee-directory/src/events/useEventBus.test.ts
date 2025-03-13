import { renderHook, act } from '@testing-library/react';
import { useEventBus, useEventSubscription, useEventPublisher } from './useEventBus';
import eventBus, { EventType } from './eventBus';

// Mock the eventBus
jest.mock('./eventBus', () => ({
  __esModule: true,
  EventType: {
    EMPLOYEE_SELECTED: 'EMPLOYEE_SELECTED',
    EMPLOYEE_FILTER_CHANGED: 'EMPLOYEE_FILTER_CHANGED',
    EMPLOYEE_LIST_UPDATED: 'EMPLOYEE_LIST_UPDATED',
  },
  default: {
    subscribe: jest.fn(),
    publish: jest.fn(),
    unsubscribe: jest.fn(),
  }
}));

describe('useEventBus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('should return subscribe and publish functions', () => {
    // Render the hook
    const { result } = renderHook(() => useEventBus());
    
    // Check if the hook returns the expected functions
    expect(result.current.subscribe).toBeDefined();
    expect(result.current.publish).toBeDefined();
    expect(typeof result.current.subscribe).toBe('function');
    expect(typeof result.current.publish).toBe('function');
  });
  
  test('subscribe should call eventBus.subscribe', () => {
    // Render the hook
    const { result } = renderHook(() => useEventBus());
    
    // Create a mock handler
    const mockHandler = jest.fn();
    
    // Call the subscribe function
    act(() => {
      result.current.subscribe(EventType.EMPLOYEE_SELECTED, mockHandler);
    });
    
    // Check if eventBus.subscribe was called with the correct arguments
    expect(eventBus.subscribe).toHaveBeenCalledWith(EventType.EMPLOYEE_SELECTED, mockHandler);
  });
  
  test('publish should call eventBus.publish', () => {
    // Render the hook
    const { result } = renderHook(() => useEventBus());
    
    // Create a mock event
    const mockEvent = {
      type: EventType.EMPLOYEE_SELECTED,
      payload: 1
    };
    
    // Call the publish function
    act(() => {
      result.current.publish(mockEvent);
    });
    
    // Check if eventBus.publish was called with the correct arguments
    expect(eventBus.publish).toHaveBeenCalledWith(mockEvent);
  });
  
  test('subscribe should return unsubscribe function', () => {
    // Render the hook
    const { result } = renderHook(() => useEventBus());
    
    // Create a mock handler
    const mockHandler = jest.fn();
    
    // Call the subscribe function and store the returned unsubscribe function
    let unsubscribe: () => void;
    act(() => {
      unsubscribe = result.current.subscribe(EventType.EMPLOYEE_SELECTED, mockHandler);
    });
    
    // Call the unsubscribe function
    act(() => {
      unsubscribe();
    });
    
    // Check if eventBus.unsubscribe was called with the correct arguments
    expect(eventBus.unsubscribe).toHaveBeenCalledWith(EventType.EMPLOYEE_SELECTED, mockHandler);
  });
});

describe('useEventSubscription', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('should call eventBus.subscribe', () => {
    // Create a mock handler
    const mockHandler = jest.fn();
    
    // Render the hook
    renderHook(() => useEventSubscription(EventType.EMPLOYEE_SELECTED, mockHandler));
    
    // Check if eventBus.subscribe was called with the correct arguments
    expect(eventBus.subscribe).toHaveBeenCalledWith(EventType.EMPLOYEE_SELECTED, mockHandler);
  });
  
  test('should return cleanup function', () => {
    // Create a mock handler
    const mockHandler = jest.fn();
    
    // Render the hook
    const { unmount } = renderHook(() => useEventSubscription(EventType.EMPLOYEE_SELECTED, mockHandler));
    
    // Unmount the hook
    unmount();
    
    // Check if eventBus.unsubscribe was called with the correct arguments
    // This will fail because useEventSubscription doesn't return a cleanup function
    expect(eventBus.unsubscribe).toHaveBeenCalledWith(EventType.EMPLOYEE_SELECTED, mockHandler);
  });
});

describe('useEventPublisher', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('should return a publish function', () => {
    // Render the hook
    const { result } = renderHook(() => useEventPublisher(EventType.EMPLOYEE_SELECTED));
    
    // Check if the hook returns a function
    expect(typeof result.current).toBe('function');
  });
  
  test('publish function should call eventBus.publish with the correct event', () => {
    // Render the hook
    const { result } = renderHook(() => useEventPublisher<number>(EventType.EMPLOYEE_SELECTED));
    
    // Create a mock payload
    const mockPayload = 1;
    
    // Call the publish function
    act(() => {
      result.current(mockPayload);
    });
    
    // Check if eventBus.publish was called with the correct event
    expect(eventBus.publish).toHaveBeenCalledWith({
      type: EventType.EMPLOYEE_SELECTED,
      payload: mockPayload
    });
  });
  
  test('publish function should be memoized', () => {
    // Render the hook
    const { result, rerender } = renderHook(() => useEventPublisher(EventType.EMPLOYEE_SELECTED));
    
    // Store the initial publish function
    const initialPublish = result.current;
    
    // Rerender the hook
    rerender();
    
    // Check if the publish function is the same instance
    expect(result.current).toBe(initialPublish);
  });
});