import { PDFDocument, rgb } from "pdf-lib";

export default defineEventHandler(async (event) => {
  if (event.method === "POST") {
    const { apotheke, strasse, plz, signatureData } = await readBody(event);
    const pdfBytes = await fetch(
      "https://www.urbeatbro.com/api/consentForm"
    ).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(pdfBytes);

    const form = pdfDoc.getForm();
    const page = pdfDoc.getPage(0);

    const apothekeField = form.getTextField("apothekeField");
    const strasseField = form.getTextField("strasseField");
    const plzField = form.getTextField("plzField");

    pdfDoc.setTitle("Consent Form");

    apothekeField.setText(apotheke);
    strasseField.setText(strasse);
    plzField.setText(plz);

    page.drawText(new Date().toLocaleDateString("de"), {
      x: 275,
      y: 75,
      size: 12,
    });

    if (signatureData) {
      const pdfImg = await pdfDoc.embedPng(signatureData);
      const { width, height } = pdfImg.scale(0.2);
      page.drawImage(pdfImg, { x: 140, y: 65, width, height });
    }

    const savedPDF = await pdfDoc.save();

    return new Response(savedPDF, {
      headers: {
        "Content-Type": "application/pdf",
      },
    });
  }
});
