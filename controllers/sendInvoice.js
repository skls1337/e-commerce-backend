const easyinvoice = require("easyinvoice");
const nodemailer = require("nodemailer");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

exports.sendInvoice = asyncHandler(async (req, res, next) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.nodemailer_email,
        pass: process.env.nodemailer_password,
      },
      tls: {
        ciphers: "SSLv3",
      },
    });

    const invoice = await easyinvoice.createInvoice(
      req.body,
      function (result) {
        return result.pdf;
      }
    );
    await transporter.sendMail({
      from: process.env.nodemailer_email,
      to: req.body.to,
      subject: "Factura Vericu",
      text: "Ia zi vericule, ce-i facem? Ti-a venit factura. Acum trebuie sa iti faci credit sa o platesti",
      attachments: [
        {
          filename: "invoice.pdf",
          content: invoice.pdf,
          encoding: "base64",
        },
      ],
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 400));
  }
  res.status(200).json({ success: true });
});
