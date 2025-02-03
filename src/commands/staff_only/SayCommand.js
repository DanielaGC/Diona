import { Command } from '../../structures'

export default class SayCommand extends Command {
  constructor() {
    super({
      name: 'say',
      user_permission: ['Administrator']
    })
  }

  run(client, message, args) {
    if (!args[0]) return message.channel.send('Você precisa por mencionar um canal ou por o ID.')
    const channel = message.guild.channels.cache.get(args[0]?.replace(/[<#>]/g, ''))
    if (!channel) return message.channel.send('Você precisa especificar um canal válido.')
    if (!args[1]) return message.channel.send('Nada para falar? Eu preciso que você digite o que deseja enviar.')
    channel.send(args.slice(1).join(' ')).then(() => {
      message.channel.send(`Mensagem enviada com sucesso no canal ${channel}`)
    })
  }
}