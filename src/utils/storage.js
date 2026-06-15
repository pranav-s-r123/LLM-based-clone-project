export function saveSession(messages) {
  localStorage.setItem("chat-history", JSON.stringify(messages));
}

export function loadSession() {
  const data = localStorage.getItem("chat-history");
  return data ? JSON.parse(data) : [];
}

export function clearSession() {
  localStorage.removeItem("chat-history");
}