export class AlreadyExistsError extends Error {
  constructor() {
    super("This value is already registered")
  }
}
