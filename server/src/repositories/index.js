import { CONFIG } from '../config/index.js';
import { Client } from '@elastic/elasticsearch';
import MessageRepository from './message.repository.js';

let messageRepositoryInstance;

export function getMessageRepository() {
  if (!messageRepositoryInstance) {
    const esClient = new Client({ node: CONFIG.ES_HOST });
    messageRepositoryInstance = new MessageRepository(esClient);
  }

  return messageRepositoryInstance;
}
