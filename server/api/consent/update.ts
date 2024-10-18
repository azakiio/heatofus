import { stripIndents } from "common-tags";
import nodemailer from "nodemailer";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event);
  const pdf = formData.get("pdf") as File;
  console.log(pdf);
  const pdfBytes = await pdf.arrayBuffer();

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

  const tagData = formData.get("tag");

  if (tagData?.toString() === "PHAC") {
    page.drawText(new Date().toLocaleDateString("de"), {
      x: 275,
      y: 90,
      size: 12,
    });
  } else {
    page.drawText(new Date().toLocaleDateString("de"), {
      x: 275,
      y: 75,
      size: 12,
    });
  }

  const signatureData = formData.get("signature");
  if (signatureData) {
    const pdfImg = await pdfDoc.embedPng(signatureData.toString());
    const { width, height } = pdfImg.scale(0.2);

    if (tagData?.toString() === "PHAC") {
      page.drawImage(pdfImg, { x: 140, y: 90, width, height });
    } else {
      page.drawImage(pdfImg, { x: 140, y: 65, width, height });
    }
  }

  if (tagData?.toString()) {
    const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    page.drawRectangle({
      x: 450,
      y: 90,
      width: 70,
      height: 40,
      color: rgb(1, 1, 1),
    });
    page.drawText(tagData.toString(), {
      x: 460,
      y: 105,
      size: 14,
      font: bold,
    });
  }

  const savedPDF = await pdfDoc.save();

  if (formData.get("emailField")) {
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

    let to = `${emailField}, thomas.mantei@janus-wa.de`;

    if (tagData?.toString() === "CHAL") {
      to = `${emailField}, einwilligung@jupdialog.de, ISR_Arzt_Consent@bayer.com`;
    }
    // TODO: Error handling
    try {
      await transporter.sendMail({
        from: "service@elearning.bayer.de",
        to: to,
        subject: `Consent Formular - ${vornameField} ${nameField}`,
        text: stripIndents`Herzlichen Dank, dass Sie uns einen Consent für die digitale Kommunikation mit Ihnen erteilt haben.

        Im Anhang haben wir das Dokument für Ihre Unterlagen beigefügt.
        
        Mit freundlichen Grüßen
        
        
        Ihr Bayer Vital Kundenservice
        `,
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
