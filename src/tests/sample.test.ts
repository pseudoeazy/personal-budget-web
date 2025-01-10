import { it, expect, describe } from 'vitest';

describe('group', () => {
  it('should', async () => {
    const response = await fetch('/user');
    const user = await response.json();
    expect(user).toMatchObject({ firstName: 'John', lastName: 'Maverick' });
    expect(true).toBeTruthy();
  });
});
