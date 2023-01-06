export default {
  name: 'ready',
  run: (client) => {
    client.user.setPresence({ activities: [{ name: 'Genshin Impact' }], status: 'dnd' })
    console.log('Diona está conectada ao Discord.')
    const channel = client.channels.cache.get(process.env.CHIT_CHAT_ID)
    /* const words = [
      'Eu vou destruir a industria do vinho!',
      'Aw, eu falhei... Ugh, de novo... Todo mundo amou minhas bebidas! Gah... Não tente me consolar. E—eu não preciso que me consolem!',
      'Orelhas de gato podem ouvir até os passos mais macios no chão.',
      'Eu gosto, não, AMO comer peixe! O peixe que o papai cozinha é o melhor, um purrfeito prato principal! ...Mas comer peixe como tira-gosto, é uma blasfêmia absoluta!'
    ]
    setInterval(() => {
      const random_words = words[Math.floor(Math.random() * words.length)]
      channel.send(random_words)
    }, 4 * 3600000) */
  }
}
