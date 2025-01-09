import '@testing-library/jest-dom/vitest';

Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
  writable: true,
  value: vi.fn().mockImplementation(function (this: HTMLDialogElement) {
    this.open = true; // Simulate the `open` property being set
  }),
});

Object.defineProperty(HTMLDialogElement.prototype, 'close', {
  writable: true,
  value: function () {
    this.removeAttribute('open');
  },
});
