import { Command } from '../../structures'

export default class EditMessageCommand extends Command {
  constructor() {
    super({
      name: 'editmsg',
      user_permission: ['ADMINISTRATOR']
    })
  }

  run(client, message, args) {
    if (!args[0]) return message.channel.send('Você esqueceu de colocar o link da mensagem! Como eu vou editar uma mensagem sem saber qual é?')
    const messageUrl = args[0].trim().split('/').slice(5, 7)
    if (!message.length > 2) return message.channel.send('Eu não acho que isso seja um link de mensagem...')
    const channel = message.guild.channels.cache.get(messageUrl[0])
    if (!args[1]) return message.channel.send('Nada para falar? Eu preciso que você coloque uma mensagem para poder editar!')
    channel.messages.edit(messageUrl[1], { content: args.slice(1).join(' ') }).then(() => {
      message.channel.send('Mensagem editada com sucesso!')
    })
  }
}
