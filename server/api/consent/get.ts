import { PDFDocument, rgb } from "pdf-lib";
import { readdir, readFile } from "node:fs/promises";

export default defineEventHandler(async ({ fetch }) => {
  // const pdf = await readFile("arzt-formular.pdf");

  // const fontBytes = await fetch('/fonts/Allura-Regular.ttf').then((res) => res.arrayBuffer());
  const dir = await readdir(".");

  // const pdfDoc = await PDFDocument.load(pdf);
  // // pdfDoc.registerFontkit(fontkit);
  // // const signatureFont = await pdfDoc.embedFont(fontBytes);

  // const form = pdfDoc.getForm();
  // const page = pdfDoc.getPage(0);

  // const genderField = form.createRadioGroup("genderField");
  // genderField.addOptionToPage("Frau", page, {
  //   x: 57,
  //   y: 517,
  //   width: 8,
  //   height: 8,
  //   borderColor: rgb(1, 1, 1),
  // });

  // genderField.addOptionToPage("Herr", page, {
  //   x: 112.5,
  //   y: 517,
  //   width: 8,
  //   height: 8,
  //   borderColor: rgb(1, 1, 1),
  // });

  // const titelField = form.createTextField("titelField");
  // titelField.addToPage(page, {
  //   x: 163,
  //   y: 516,
  //   width: 249,
  //   height: 13,
  //   borderColor: rgb(1, 1, 1),
  // });

  // const vornameField = form.createTextField("vornameField");
  // vornameField.addToPage(page, {
  //   x: 57,
  //   y: 490,
  //   width: 355,
  //   height: 13,
  //   borderColor: rgb(1, 1, 1),
  // });

  // const nameField = form.createTextField("nameField");
  // nameField.addToPage(page, {
  //   x: 57,
  //   y: 464,
  //   width: 355,
  //   height: 13,
  //   borderColor: rgb(1, 1, 1),
  // });

  // const apothekeField = form.createTextField("apothekeField");
  // apothekeField.addToPage(page, {
  //   x: 57,
  //   y: 438,
  //   width: 355,
  //   height: 13,
  //   borderColor: rgb(1, 1, 1),
  // });

  // const strasseField = form.createTextField("strasseField");
  // strasseField.addToPage(page, {
  //   x: 57,
  //   y: 412,
  //   width: 355,
  //   height: 13,
  //   borderColor: rgb(1, 1, 1),
  // });

  // const plzField = form.createTextField("plzField");
  // plzField.addToPage(page, {
  //   x: 57,
  //   y: 386,
  //   width: 355,
  //   height: 13,
  //   borderColor: rgb(1, 1, 1),
  // });

  // const emailField = form.createTextField("emailField");
  // emailField.addToPage(page, {
  //   x: 57,
  //   y: 360,
  //   width: 355,
  //   height: 13,
  //   borderColor: rgb(1, 1, 1),
  // });

  // const mobileField = form.createTextField("mobileField");
  // mobileField.addToPage(page, {
  //   x: 57,
  //   y: 334,
  //   width: 355,
  //   height: 13,
  //   borderColor: rgb(1, 1, 1),
  // });

  // const telefonField = form.createTextField("telefonField");
  // telefonField.addToPage(page, {
  //   x: 57,
  //   y: 308,
  //   width: 355,
  //   height: 13,
  //   borderColor: rgb(1, 1, 1),
  // });

  // const faxField = form.createTextField("faxField");
  // faxField.addToPage(page, {
  //   x: 57,
  //   y: 282,
  //   width: 355,
  //   height: 13,
  //   borderColor: rgb(1, 1, 1),
  // });

  // // const signatureField = form.createTextField('signatureField');
  // // signatureField.addToPage(page, {
  // // 	x: 100,
  // // 	y: 70,
  // // 	width: 150,
  // // 	height: 25,
  // // 	borderColor: rgb(1, 1, 1),
  // // });
  // // signatureField.setFontSize(16);
  // // signatureField.setAlignment(TextAlignment.Center);
  // // signatureField.updateAppearances(signatureFont);

  // pdfDoc.setTitle("Consent Form");

  // const savedPDF = await pdfDoc.save();

  return new Response(dir.join("/n"), {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
});
