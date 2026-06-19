const AUTH_SESSION_KEY = "jenna-birthday-authenticated"

export function isAuthenticated(): boolean {
  return sessionStorage.getItem(AUTH_SESSION_KEY) === "true"
}

export function setAuthenticated(): void {
  sessionStorage.setItem(AUTH_SESSION_KEY, "true")
}

export function clearAuthenticated(): void {
  sessionStorage.removeItem(AUTH_SESSION_KEY)
}
