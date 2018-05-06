import ValidateException from './ValidateException'

interface iRuleUnique {
  values: Array<any>,
  key?: string
}

type tRuleRequired = boolean

type tRuleString = string|{
  max?: number,
  min?: number
}

export interface iRule {
  attrs: string[],
  required?: tRuleRequired,
  unique?: iRuleUnique,
  str?: tRuleString
}

interface iStringHandlerCheck {
  fun: (attr: string) => void,
  type: string
}

export default class Validator {
  rules: iRule[]
  message = ''
  currentAttrs: string[]
  obj: any = {}
  attrs: string[]

  constructor (rules: iRule[], obj: any) {
    const objKeys = Object.keys(obj)
    if (typeof obj !== 'object' || objKeys.length === 0) throw new Error('Необходим объект')
    else if (Array.isArray(rules) === false || rules.length === 0) throw new Error('Необходимы правила')
    this.obj = obj
    this.rules = rules
    this.attrs = objKeys
  }

  validate = () => {
    try {
      for (let rule of this.rules) {
        this.setAttrs(rule.attrs || rule.attrs)
        if (!this.currentAttrs.length) continue
        // else
        this.handleRequired(rule)
        this.handleUnique(rule)
        this.handleString(rule)
      }
    } catch (err) {
      if (err instanceof ValidateException)
        this.message = err.getMessage()
      else {
        console.log(err)
        this.message = 'Ошибка проверки данных'
      }
    }
   
  }

  /*
  ----- Private -----
  */
  setAttrs = (loAttrs: string[]) => {
    if (Array.isArray(loAttrs)) this.currentAttrs = loAttrs
    else if (typeof loAttrs === 'string') this.currentAttrs = [ loAttrs ]
    else throw new Error('Некорректно заполнено поле attrs')
  }

  handleRequired = ({ required }: { required?: tRuleRequired }) => {
    if (!required) return
    // else
    for (let attr of this.currentAttrs)
      if (!this.obj[attr]) throw new ValidateException(attr, 'required')
  }

  handleUnique = ({ unique }: { unique?: iRuleUnique }) => {
    if (!unique || typeof unique !== 'object') return
    if (Array.isArray(unique.values) === false || !unique.values)
      throw new Error('Некорректно заполнено поле unique.values')
    if (!unique.key || typeof unique.key !== 'string') { // Значит, считаем что в values не объкты
      for (let value of unique.values)
        for (let attr of this.currentAttrs)
          if (this.obj[attr] === value) throw new ValidateException(attr, 'unique')
    } else { // Иначи считаем что в values - объекты
      for (let value of unique.values)
        for (let attr of this.currentAttrs)
          if (this.obj[attr] === value[unique.key]) throw new ValidateException(attr, 'unique')
    }
  }

  handleString = ({ str }: { str?: tRuleString }) => {
    if (!str) return
    let checks: Array<iStringHandlerCheck> = []
    checks.push({ fun: (attr) => typeof this.obj[attr] !== 'string', type: 'string' })
    if (typeof str === 'object') {
      if (str.max && typeof str.max === 'number')
        checks.push({ fun: (attr) => this.obj[attr].length > str.max, type: 'string/max' })
      if (str.min && typeof str.min === 'number')
        checks.push({ fun: (attr) => this.obj[attr].length < str.min, type: 'string/min' })
    }
    // if (this.currentAttrs.some((attr) => typeof this.obj[attr] !== 'string'))
    //   throw new ValidateException(attr, 'unique')
    this.currentAttrs.some((currentAttr) => checks.some((check) => {
      if (check.fun(currentAttr)) throw new ValidateException(currentAttr, check.type)
      else return false
    })) 
  }

}