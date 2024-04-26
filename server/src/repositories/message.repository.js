import { CHATBOT_MESSAGES_INDEX } from '../constants.js';

export default class MessageRepository {
  constructor(esClient) {
    this.esClient = esClient;
  }

  async saveMessage({ message, isQuestion, author }) {
    await this.esClient.index({
      index: CHATBOT_MESSAGES_INDEX,
      document: {
        timestamp: Date.now(),
        message,
        isQuestion,
        author
      }
    });
  }

  async searchAnswer(message) {
    const response = await this.esClient.search({
      index: CHATBOT_MESSAGES_INDEX,
      query: {
        bool: {
          must: {
            match: {
              message: {
                query: message
              }
            }
          },
          filter: [
            {
              term: {
                isQuestion: false
              }
            }
          ]
        }
      }
    });
    const { hits } = response;
    return hits?.total?.value > 0 ? hits.hits[0]?._source?.message : null;
  }
}