import { phrases } from '../structures'
export default {
  name: 'ready',
  run: (client) => {
    client.user.setPresence({ activities: [{ name: 'Genshin Impact' }], status: 'dnd' })
    console.log('Diona está conectada ao Discord.')
    const channel = client.channels.cache.get(process.env.CHIT_CHAT_ID)
    setInterval(() => {
      const random_quotes = phrases[Math.floor(Math.random() * phrases.length)]
      const last_message = channel.guild.channels.cache.get(channel.id).messages.cache.get(channel?.lastMessageId)
      const date = last_message?.createdTimestamp + (2 * 3600000)

      if ((!last_message?.author.bot) && (date < Date.now())) {
        return
      }

      channel.send(random_quotes)
    }, 4 * 3600000)
  }
}