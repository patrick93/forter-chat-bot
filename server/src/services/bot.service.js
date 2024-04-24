export default class BotService {
  constructor(messageService, io) {
    this.messageService = messageService;
    this.io = io;
  }

  async processMessage(message) {
    const isQuestion = this.messageService.isQuestion(message);
    if (isQuestion) {
      const answer = await this.messageService.searchAnswer(message);
      if (answer) {
        this.io.emit('newMessage', { user: 'Bot', message: answer });
      }
    }
  }
}