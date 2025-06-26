export class AlreadyExistsError extends Error {
  public readonly statusCode: number
  public readonly field: string
  public readonly value: string

  constructor(field: string, value: string) {
    super(`Já existe o valor ${value} registrado no sistema`)

    this.name = "AlreadyExistsError"

    this.statusCode = 409
    this.field = field
    this.value = value

    Object.setPrototypeOf(this, AlreadyExistsError.prototype)
    Error.captureStackTrace(this, this.constructor)
  }
}
