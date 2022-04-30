import 'dotenv/config'
import { DionaClient } from './src/DionaClient'
const client = new DionaClient(process.env.DISCORD_TOKEN, { intents: 112639 })
client.start()
