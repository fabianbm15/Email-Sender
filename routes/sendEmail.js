var express = require("express");
var router = express.Router();
const { Resend } = require("resend");
let resend;

// usar require
const {
  validateEmail,
  validateNameSubject,
  validateMessage,
  validateApiResend,
} = require("../utils/validate");
const e = require("express");

// Ruta get
router.get("/", function (req, res, next) {
  res.send("Send email");
});

router.post("/", async function (req, res, next) {
  // Obtener nombre, email, asunto, mensaje de query
  const { name, email, subject, message, apiResend, emailToSend } = req.body;

  // Manejar error si no recibo estos datos
  if (!name || !email || !subject || !message || !apiResend || !emailToSend) {
    return res.status(400).send("Missing parameters");
  }

  // Validaciones si los datos son correctos, es decir, si el email es un email valido
  if (!validateEmail(email) || !validateEmail(emailToSend)) {
    return res.status(400).send("Invalid email");
  }

  // Validar si el asunto es correcto
  if (!validateNameSubject(subject)) {
    return res.status(400).send("Invalid subject");
  }

  // Validar si el nombre es correcto
  if (!validateNameSubject(name)) {
    return res.status(400).send("Invalid name");
  }

  // Validar si la apiResend es correcta
  if (!validateApiResend(apiResend)) {
    return res.status(400).send("Invalid apiResend");
  }

  // Validar si el mensaje es correcto
  if (!validateMessage(message)) {
    return res.status(400).send("Invalid message");
  }

  // Crear una instancia de Resend
  try {
    resend = new Resend(apiResend);
  } catch (error) {
    return res.status(500).send(error.message);
  }

  // Enviar email
  try {
    const { data } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [`${emailToSend}`],
      subject: `🤯 Nuevo mensaje de: ${name} <${email}>: ${subject}`,
      html: `
      <h1>🤯 Nuevo mensaje</h1>
      <p>Alguien ha enviado un mensaje desde la página web:</p>
      <hr>
      <strong>Nombre: </strong><span>${name}</span>
      <br>
      <strong>Email: </strong><span>${email}</span>
      <br>
      <strong>Asunto: </strong><span>${subject}</span>
      <br>
      <strong>Mensaje: </strong><span>${message}</span>
      `,
    });
    console.log({ data });
    if (!data) {
      return res.status(500).send("Error sending email");
    }

    return res.status(200).send("Email sent!");
  } catch (error) {
    return res.status(500).send("Error sending email ", error);
  }
});

module.exports = router;
