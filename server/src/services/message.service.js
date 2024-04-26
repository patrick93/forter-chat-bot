import nlp from 'compromise';

export default class MessageService {
  constructor(messageRepository) {
    this.messageRepository = messageRepository;
  }

  async saveMessage(message, author) {
    const isQuestion = this.isQuestion(message);
    await this.messageRepository.saveMessage({ message, author, isQuestion });
  }

  async searchAnswer(message) {
    return this.messageRepository.searchAnswer(message);
  }

  isQuestion(message) {
    return !!nlp(message).sentences().isQuestion().out('array').length;
  }
}