import MessageService from './message.service.js';
import { getMessageRepository } from '../repositories/index.js';

let messageServiceInstance;

export function getMessageService() {
  if (!messageServiceInstance) {
    const messageRepository = getMessageRepository();
    messageServiceInstance = new MessageService(messageRepository);
  }

  return messageServiceInstance;
}
