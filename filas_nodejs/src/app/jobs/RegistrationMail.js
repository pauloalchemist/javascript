import Mail from '../lib/mail';

export default {
  key: 'RegistrationMail',
  options: {
    
  },
  async handle({data}) {
    const { user } = data;

    await Mail.sendMail({
      from: 'Paulo Giovani <paulolinsdev@gmail.com>',
      to: `${user.name} <${user.email}>`,
      subject: 'Cadastro de usuário',
      html: `Olá ${user.name}, bem-vindo ao sistema ultramegapower :D!!!`
    });
  }
};