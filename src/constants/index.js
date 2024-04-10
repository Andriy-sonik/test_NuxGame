export const LAYOUTS = {
  MAIN: 'MAIN'
}

export const REGEXP = {
  ALPHA_SPACE_REGEX: new RegExp(/^[a-zA-Zа-яА-ЯёЁґҐіІїЇєЄ ]*$/),
  NON_ALPHA_REGEX: new RegExp(/[^a-zA-Zа-яА-ЯёЁґҐіІїЇєЄ]/),
  NUMBER_REGEX: new RegExp(/^\d+$/)
}

// constants localStorage
export const LS = {
  FAVORITE_TODOS: 'FAVORITE_TODOS'
}
