// @flow

export default class ValidateException {
  name: string = 'ValidateException'
  attribute: string = ''
  errorType: string = ''
  message: string = ''

  constructor (attribute: string, errorType: string) {
    // if (typeof attribute !== 'string' || attribute.length === 0) {
    //   throw new Error('Необходим аттрибут')
    // }
    // if (typeof errorType !== 'string' || errorType.length === 0) {
    //   throw new Error("Необходим тип ошибки")
    // }
    this.attribute = attribute
    this.errorType = errorType
  }

  getMessage (): string {
    if (!this.message) this.generateMessage()
    return this.message
  }

  /*
  ----- Private -----
  */
  generateMessage () {
    switch (this.errorType) {
      case 'required':
        this.message = `Не заполнено поле ${this.attribute}`
        break
      case 'unique':
        this.message = `Поле ${this.attribute} должно быть уникальным`
        break
      case 'string':
        this.message = `Поле ${this.attribute} должно быть строкой`
        break
      case 'string/min':
        this.message = `Поле ${this.attribute} слишком короткое`
        break
      case 'string/max':
        this.message = `Поле ${this.attribute} слишком длинное`
        break
      default:
        throw new Error('Неправильный тип ошибки')
    }
  }
}
