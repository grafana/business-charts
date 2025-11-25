// Jest setup provided by Grafana scaffolding
import './.config/jest-setup';

import { TextDecoder, TextEncoder } from 'util';

// mock the intersection observer and just say everything is in view
const mockIntersectionObserver = jest
  .fn()
  .mockImplementation((callback) => ({
    observe: jest.fn().mockImplementation((elem) => {
      callback([{ target: elem, isIntersecting: true }]);
    }),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));

/**
 * Assign Text Decoder and Encoder which are required in @grafana/ui
 */
Object.assign(global, {
  IntersectionObserver: mockIntersectionObserver,
  TextDecoder,
  TextEncoder
});