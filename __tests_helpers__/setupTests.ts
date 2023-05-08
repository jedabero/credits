Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID() {
      return 'A-U-U-ID-S';
    },
  },
});

export {};
