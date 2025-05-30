describe('Main entry point', () => {
  it('should import without throwing', () => {
    expect(() => {
      require('./main');
    }).not.toThrow();
  });
});