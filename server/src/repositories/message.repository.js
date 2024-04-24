export default class MessageRepository {
  constructor(esClient) {
    this.esClient = esClient;
  }

  async saveMessage(message, isQuestion) {
    await this.esClient.index({
      index: "chatbot_messages",
      document: {
        timestamp: Date.now(),
        message,
        isQuestion
      }
    });
  }

  async searchAnswer(message) {
    const response = await this.esClient.search({
      index: "chatbot_messages",
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