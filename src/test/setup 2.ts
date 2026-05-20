import '@testing-library/jest-dom';
import React from 'react';
import { vi } from 'vitest';

function createMotionComponent(tag: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = ({ children, initial, animate, exit, whileInView, whileHover, transition, viewport, ...rest }: any) => {
    void initial; void animate; void exit; void whileInView; void whileHover; void transition; void viewport;
    return React.createElement(tag, rest, children);
  };
  Component.displayName = `motion.${tag}`;
  return Component;
}

const mockMotionValue = { get: () => 0, set: vi.fn(), onChange: vi.fn() };

vi.mock('motion/react', () => ({
  motion: new Proxy({}, {
    get: (_target, prop) => createMotionComponent(String(prop)),
  }),
  useInView: () => true,
  useReducedMotion: () => false,
  useScroll: () => ({ scrollYProgress: mockMotionValue }),
  useSpring: () => mockMotionValue,
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})) as unknown as typeof IntersectionObserver;

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
