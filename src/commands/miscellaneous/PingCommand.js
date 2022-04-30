import { Command } from '../../structures'

export default class PingCommand extends Command {
  constructor() {
    super({
      name: 'ping'
    })
  }

  run(client, message, args) {
    message.channel.send(`${client.ws.ping}ms!`)
  }
}