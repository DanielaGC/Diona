export class Command {
  constructor(data) {
    this.config = {
      name: data.name,
      aliases: data.aliases || [],
      category: data.category || [],
      user_permission: data.user_permission || [],
      bot_permission: data.bot_permission || [],
      owner_only: data.owner_only || false
    }
  }
}