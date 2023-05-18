export function isAuthenticated (to, from, next) {
  if (!localStorage.getItem('token_todo')) {
    next('/')
  }
  next()
}
