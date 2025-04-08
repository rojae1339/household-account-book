import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GOOGLE_USER_EMAIL,
        pass: process.env.GOOGLE_USER_PASSWORD,
    },
});

export const sendVerificationEmail = async (email: string, veriToken: string) => {
    const verificationLink = `${process.env.NEXTAUTH_URL}/api/verify?token=${veriToken}`;

    const mailOptions = {
        from: process.env.GOOGLE_USER_EMAIL,
        to: email,
        subject: '이메일 인증 요청',
        html: `<p>회원가입을 완료하려면 아래 링크를 클릭하세요:</p>
               <a href="${verificationLink}">${verificationLink}</a>`,
    };

    await transport.sendMail(mailOptions);
};

export const sendPwFindEmail = async (email: string, token: string) => {
    const verificationLink = `${process.env.NEXTAUTH_URL}/pw-reset?token=${token}`;

    const mailOptions = {
        from: process.env.GOOGLE_USER_EMAIL,
        to: email,
        subject: '비밀번호 초기화',
        html: `<p>비밀번호를 초기화 하시려면 아래 <a href="${verificationLink}">링크</a>를 클릭하세요</p>`,
    };

    await transport.sendMail(mailOptions);
};
