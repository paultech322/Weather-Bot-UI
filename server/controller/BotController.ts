import { Controller, Post, Body, Get } from "@nestjs/common"
import BotModel from "../model/BotModel"
import launch, { stop } from "../bot/WeatherBot"

@Controller()
class BotController {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor() {}

  @Post("/api/bot/update")
  public async updateBotKey(@Body() body: { key: string }) {
    const { key } = body

    try {
      const bot = await BotModel.findOneAndUpdate({ key }).lean()

      return bot as any
    } catch (err: any) {
      throw new Error(err)
    }
  }

  @Post("/api/bot/relanuch")
  public async relaunch(@Body() body: { newkey: string; oldKey: string }) {
    const { newkey, oldKey } = body

    try {
      stop(oldKey)

      await BotModel.findOneAndUpdate({ key: oldKey }, { key: newkey }).lean()

      launch(newkey)
    } catch (err: any) {
      throw new Error(err)
    }
  }

  @Get("/api/bot/getKey")
  public async getKey() {
    try {
      const bots = await BotModel.find({})

      if (bots.length) return bots[0]

      return null
    } catch (err: any) {
      throw new Error(err)
    }
  }
}

export default BotController
