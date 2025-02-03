import { Command } from '../../structures/'

export default class ImageCommand extends Command {
  constructor() {
    super({
      name: 'image',
      user_permission: ['Administrator']
    })
  }

  run(client, message, args) {
    if (!args[0]) return message.channel.send('Você precisa por mencionar um canal ou por o ID.')
    const channel = message.guild.channels.cache.get(args[0]?.replace(/[<#>]/g, ''))
    if (!channel) return message.channel.send('Você precisa especificar um canal válido.')
    const attachment = []
    for (const files of message.attachments) {
      attachment.push({
        attachment: files[1].attachment,
        name: files[1].name,
        description: files[1].description
      })
    }

    channel.send({
      files: attachment
    }).then(() => {
      message.channel.send(`Mensagem enviada com sucesso no canal ${channel}`)
    })
  }
}