import { Client } from 'discord.js'
import { readdirSync } from 'fs'

export class DionaClient extends Client {
  constructor(token, options) {
    super(options)
    super.login(token)

    this.aliases = new Map()
    this.commands = new Map()
  }

  loadCommands() {
    readdirSync('src/commands').forEach((category) => {
      readdirSync(`src/commands/${category}`).forEach(async (cmd) => {
        const Command = await import(`./commands/${category}/${cmd.split('.')[0]}`)
        const command = new Command.default()
        this.commands.set(command.config.name, command)
        command.config.aliases.forEach((alias) => this.aliases.set(alias, command.config.name))
      })
    })
  }

  loadListeners() {
    readdirSync('src/listeners/').forEach(async (event) => {
      const events = await import(`./listeners/${event.split('.')[0]}`)
      super.on(events.default.name, (...args) => events.default.run(this, ...args))
    })
  }

  start() {
    this.loadCommands()
    this.loadListeners()
  }
}