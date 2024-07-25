import { PDFDocument, rgb } from "pdf-lib";

export default defineEventHandler(async ({ $fetch }) => {
  const pdf = await $fetch("/arzt-consent-pharma.pdf", {
    baseURL: "http://localhost:3000",
  });

  const pdfBlob = (await pdf) as Blob;
  const pdfBytes = await pdfBlob.arrayBuffer();

  const pdfDoc = await PDFDocument.load(pdfBytes);

  const form = pdfDoc.getForm();
  const page = pdfDoc.getPage(0);
  console.log(form.getFields().map((field) => field.getName()));

  return;
  const genderField = form.createRadioGroup("genderField");
  genderField.addOptionToPage("Frau", page, {
    x: 57,
    y: 528,
    width: 8,
    height: 8,
    borderColor: rgb(1, 1, 1),
  });

  genderField.addOptionToPage("Herr", page, {
    x: 114.5,
    y: 527,
    width: 8,
    height: 8,
    borderColor: rgb(1, 1, 1),
  });

  genderField.addOptionToPage("Divers", page, {
    x: 185.5,
    y: 528,
    width: 8,
    height: 8,
    borderColor: rgb(1, 1, 1),
  });

  const titelField = form.createTextField("titelField");
  titelField.addToPage(page, {
    x: 235,
    y: 528,
    width: 177,
    height: 13,
    borderColor: rgb(1, 1, 1),
  });

  const vornameField = form.createTextField("vornameField");
  vornameField.addToPage(page, {
    x: 57,
    y: 507,
    width: 160,
    height: 13,
    borderColor: rgb(1, 1, 1),
  });

  const nameField = form.createTextField("nameField");
  nameField.addToPage(page, {
    x: 57,
    y: 480,
    width: 355,
    height: 13,
    borderColor: rgb(1, 1, 1),
  });

  const praxisField = form.createTextField("praxisField");
  praxisField.addToPage(page, {
    x: 57,
    y: 454,
    width: 355,
    height: 13,
    borderColor: rgb(1, 1, 1),
  });

  const strasseField = form.createTextField("strasseField");
  strasseField.addToPage(page, {
    x: 57,
    y: 428,
    width: 355,
    height: 13,
    borderColor: rgb(1, 1, 1),
  });

  const plzField = form.createTextField("plzField");
  plzField.addToPage(page, {
    x: 57,
    y: 402,
    width: 355,
    height: 13,
    borderColor: rgb(1, 1, 1),
  });

  const emailField = form.createTextField("emailField");
  emailField.addToPage(page, {
    x: 57,
    y: 376,
    width: 355,
    height: 13,
    borderColor: rgb(1, 1, 1),
  });

  const mobileField = form.createTextField("mobileField");
  mobileField.addToPage(page, {
    x: 57,
    y: 350,
    width: 355,
    height: 13,
    borderColor: rgb(1, 1, 1),
  });

  const telefonField = form.createTextField("telefonField");
  telefonField.addToPage(page, {
    x: 57,
    y: 324,
    width: 355,
    height: 13,
    borderColor: rgb(1, 1, 1),
  });

  const faxField = form.createTextField("faxField");
  faxField.addToPage(page, {
    x: 57,
    y: 298,
    width: 355,
    height: 13,
    borderColor: rgb(1, 1, 1),
  });

  const communicationField = form.createRadioGroup("communicationField");
  communicationField.addOptionToPage("email", page, {
    x: 256,
    y: 264,
    width: 8,
    height: 8,
    borderColor: rgb(1, 1, 1),
  });

  communicationField.addOptionToPage("fax", page, {
    x: 327,
    y: 263,
    width: 8,
    height: 8,
    borderColor: rgb(1, 1, 1),
  });

  // const signatureField = form.createTextField('signatureField');
  // signatureField.addToPage(page, {
  // 	x: 100,
  // 	y: 70,
  // 	width: 150,
  // 	height: 25,
  // 	borderColor: rgb(1, 1, 1),
  // });
  // signatureField.setFontSize(16);
  // signatureField.setAlignment(TextAlignment.Center);
  // signatureField.updateAppearances(signatureFont);

  pdfDoc.setTitle("Arzt Einwilligung-Formular");

  const savedPDF = await pdfDoc.save();

  return new Response(savedPDF, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
});
