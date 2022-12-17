import { Content } from '../content';

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content(
      'Você recebeu uma nova solicitação de amizade!',
    );

    expect(content).toBeTruthy();
  });

  it('should be able to get the notification content value', () => {
    let notificationMessage = 'Você recebeu uma nova solicitação de amizade!';
    const content = new Content(notificationMessage);

    expect(content.value).toEqual(notificationMessage);
  });

  it('should not be able to create a notification content with less than 5 characters', () => {
    expect(() => new Content('Test')).toThrow();
  });

  it('should not be able to create a notification content with more than 240 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
