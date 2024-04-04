import nodemailer from "nodemailer";
export default defineEventHandler(async (event) => {
  if (event.method === "OPTIONS") {
    console.log("preflight");
    setResponseStatus(event, 204, "No Content.");
    return "OK!";
  }
  const { email, output } = await readBody(event);
  if (email) {
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
        to: `${email}`, // , einwilligung@jupdialog.de, ISR_Arzt_Consent@bayer.com`,
        subject: `Allgemeinmedizin Bestellung`,
        text: output,
      });
    } catch (err) {
      console.log(err);
      return new Response(null, {
        status: 500,
        statusText: err as string,
      });
    }
  }

  return new Response("Sent!");
});
