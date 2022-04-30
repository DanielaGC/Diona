export default {
  name: 'messageCreate',
  run: async (client, message) => {
    if (message.author.bot) return
    if (!message.guild) return
    if (!message.content.startsWith(process.env.BOT_PREFIX)) return
    const args = message.content.replace(process.env.BOT_PREFIX, '').trim().split(/ /g)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (cmd) {
      if (!message.member.permissions.has(cmd.config.user_permission)) return message.channel.send('Você não é digno de usar este comando.')
      cmd.run(client, message, args)
    }
  }
}