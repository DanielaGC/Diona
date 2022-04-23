require('dotenv').config()
const { Client } = require('discord.js')
const client = new Client({ intents: 112639 })

client.once('ready', () => {
  client.user.setPresence({ activities: [{ name: 'Genshin Impact' }], status: 'dnd' })
  console.log('Diona está conectada ao Discord.')
  const channel = client.channels.cache.get('810254054721978391')
  const words = [
    'Eu vou destruir a industria do vinho!',
    'Aw, eu falhei... Ugh, de novo... Todo mundo amou minhas bebidas! Gah... Não tente me consolar. E—eu não preciso que me consolem!',
    'Orelhas de gato podem ouvir até os passos mais macios no chão.',
    'Eu gosto, não, AMO comer peixe! O peixe que o papai cozinha é o melhor, um purrfeito prato principal! ...Mas comer peixe como tira-gosto, é uma blasfêmia absoluta!'
  ]
  setInterval(() => {
    const random_words = words[Math.floor(Math.random() * words.length)]
    channel.send(random_words)
  }, 4 * 3600000)
})

client.on('error', (err) => {
  console.log(err.message)
})

client.on('messageCreate', async (message) => {
  if (message.author.bot) return
  if (!message.guild) return
  if (!message.content.startsWith(process.env.BOT_PREFIX)) return
  const args = message.content.replace(process.env.BOT_PREFIX, '').trim().split(/ /g)
  const command = args.shift().toLowerCase()
  if (command === 'say') {
    if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('Você não é digno de usar este comando.')
    if (!args[0]) return message.channel.send('Você precisa por mencionar um canal ou por o ID.')
    const channel = message.guild.channels.cache.get(args[0]?.replace(/[<#>]/g, ''))
    if (!channel) return message.channel.send('Você precisa especificar um canal válido.')
    if (!args[1]) return message.channel.send('Nada para falar? Eu preciso que você digite o que deseja enviar.')
    channel.send(args.slice(1).join(' ')).then(() => {
      message.channel.send(`Mensagem enviada com sucesso no canal ${channel}`)
    })
  }

  if (command === 'image') {
    if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('Você não é digno de usar este comando.')
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
})

client.login(process.env.DISCORD_TOKEN)
