import fs from "fs/promises";
import path from "path";
import { PDFDocument } from "pdf-lib";
import nodemailer from "nodemailer";
import { stripIndents } from "common-tags";

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event);
  const filePath = path.resolve("./public/arzt-formular.pdf");
  const pdfBytes = await fs.readFile(filePath);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  const form = pdfDoc.getForm();
  const page = pdfDoc.getPage(0);
  formData.forEach((value, key) => {
    try {
      const field = form.getTextField(key);
      field.setText(value.toString());
    } catch (err) {
      console.log(err);
      try {
        const radioField = form.getRadioGroup(key);
        radioField.select(value.toString());
      } catch (err) {
        console.log(err);
      }
    }
  });
  page.drawText(new Date().toLocaleDateString("de"), {
    x: 275,
    y: 75,
    size: 12,
  });

  const signatureData = formData.get("signature");
  if (signatureData) {
    const pdfImg = await pdfDoc.embedPng(signatureData.toString());
    const { width, height } = pdfImg.scale(0.2);
    page.drawImage(pdfImg, { x: 140, y: 65, width, height });
  }

  const savedPDF = await pdfDoc.save();

  if (formData.get("email")) {
    const emailField = formData.get("emailField")?.toString();
    const nameField = formData.get("nameField")?.toString();
    const vornameField = formData.get("vornameField")?.toString();
    const transporter = nodemailer.createTransport({
      host: "mail.agenturserver.de",
      port: 465,
      auth: {
        user: "service@elearning.bayer.de",
        pass: "iqibizAl!235",
      },
    });

    // TODO: Error handling
    try {
      await transporter.sendMail({
        from: "service@elearning.bayer.de",
        to: `einwilligung@jupdialog.de, ${emailField}`,
        subject: `Consent Formular - ${vornameField} ${nameField}`,
        text: stripIndents`Herzlichen Dank für Ihre Einwilligung.
        Im Anhang haben wir für Sie das Dokument für Ihre Unterlagen beigefügt.
         
        Beste Grüße, Ihr Bayer Service-Team`,
        attachments: [
          {
            filename: "Consent Formular.pdf",
            content: Buffer.from(savedPDF),
          },
        ],
      });
    } catch (err) {
      console.log(err);
      return new Response(null, {
        status: 500,
        statusText: err as string,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    return new Response("Sent!", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  return new Response(savedPDF, {
    headers: {
      "Content-Type": "application/pdf",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
});
