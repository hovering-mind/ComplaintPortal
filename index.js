const express = require("express")
const joi = require("joi")
const nodemailer = require("nodemailer");

const app = express()
const port = 3000;

const mailobj = joi.object({
    type: joi.string(),
    desc: joi.string()
})

app.use(express.json())

app.get("/hey",(req, res) =>{
    res.send("I am listening")
})
//mailobj.validate(req.body)
app.post("/sendMail",function(req, res){
    const mailbody = mailobj.validate(req.body)
    sendMail("codekabila.club@gmail.com", mailbody.type, mailbody.desc)
    res.send("hello")
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
} )


const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: "faizanazmi321@gmail.com",
    pass: "ouhgwycrnulbjjni",
  },
});

function sendMail(to, subject, text) {
  const mailOptions = {
    from: "faizanazmi321@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

//sendMail("faizanazmi.1907@gmail.com","kya hi likhu","jindagi chudi padi hai")
