export default class AlreadyExistException extends Error {
  constructor(message) {
    super(message)
    this.name = 'AlreadyExistException'
    this.statusCode = 409;
  }
}
