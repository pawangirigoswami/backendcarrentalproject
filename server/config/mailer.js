const nodemailer = require("nodemailer")
require("dotenv").config()


const sendMail = async(userEmail,subject,message) =>{
    try{
        const transporter = nodemailer.createTransport({
            service:"gmail",
            secure:true,
            port:465,
            auth:{
                user:process.env.EMAIL,
                pass:process.env.EMAIL_PASS
            }
        })

        const mail = {
            from:process.env.EMAIL,
            to:userEmail,
            subject,
            text:message
        }

        const info = await transporter.sendMail(mail)
        console.log("email sent:",info.response)
        return{
            success:true,
            message:"email sent successfully"
        }

    }catch(err){
        console.log("email sending error:",err)
        return{
            success:false,
            message:"failed to send email"
        }
    }
}

module.exports = sendMail;