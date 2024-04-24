import MessageService from './message.service.js';
import BotService from './bot.service.js';
import { getMessageRepository } from '../repositories/index.js';

let messageServiceInstance;
let botServiceInstance;

export function getMessageService() {
  if (!messageServiceInstance) {
    const messageRepository = getMessageRepository();
    messageServiceInstance = new MessageService(messageRepository);
  }

  return messageServiceInstance;
}

export function getBotService(io) {
  if (!botServiceInstance) {
    const messageService = getMessageService();
    botServiceInstance = new BotService(messageService, io);
  }

  return botServiceInstance;
}