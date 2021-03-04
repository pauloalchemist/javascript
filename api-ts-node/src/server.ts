import { Server } from '@overnightjs/core'
import './util/module-alias'
import bodyparser from 'body-parser'
import { ForecastController } from './controllers/forescast'
import { Application } from 'express'

export class SetupServer extends Server {
  constructor (private port = 3000) {
    super()
  }

  public init (): void {
    this.setupExpress()
    this.setupControllers()
  }

  private setupExpress (): void {
    this.app.use(bodyparser.json())
  }

  private setupControllers (): void {
    const forecastController = new ForecastController()
    this.addControllers([forecastController])
  }

  public getApp (): Application {
    return this.app
  }

}
