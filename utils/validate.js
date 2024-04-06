function validateEmail(email) {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(email);
}

// fusionar validateName y validateSubject
function validateNameSubject(string) {
  // debe tener minimo 3 caracteres, solo puede contener letras y espacios
  const re = /^[a-zA-Z\s]{3,}$/;
  return re.test(string);
}

// Validar mensaje
function validateMessage(message) {
  // debe tener minimo 20 caracteres, solo puede contener puntos, comas, punto y coma, comillas y espacios, además puede aceptar tildes
  const re = /^[a-zA-Z0-9.,;""!¡\sáéíóúÁÉÍÓÚñÑ]{20,}$/;
  return re.test(message);
}

// validar apiResend, debe comenzar con "re_"
function validateApiResend(apiKeyResend) {
  const re = /^re_[a-zA-Z0-9._-]{3,}$/;
  return re.test(apiKeyResend);
}

module.exports = {
  validateEmail,
  validateNameSubject,
  validateMessage,
  validateApiResend,
};
