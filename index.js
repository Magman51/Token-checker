const axios = require('axios');
const colors = require('colors');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function getUserData(token) {
  try {
    const { data } = await axios.get('https://discordapp.com/api/v9/users/@me', {
      headers: {
        Authorization: token
      }
    });

    console.log(colors.red('Token válido.'));
    console.log(`${colors.red('Correo:')} ${colors.yellow(data.email)}`);
    console.log(`${colors.red('Número:')} ${colors.yellow(data.phone || 'No disponible')}`);
    console.log(`${colors.red('Usuario:')} ${colors.yellow(`${data.username}#${data.discriminator} (${data.id})`)}`);

    const userData = {
      token: token.replace(/"/g, ''), 
      correo: data.email,
      numero: data.phone || 'No disponible',
      usuario: `${data.username}#${data.discriminator}`,
      revisado: true
    };

    return userData;
  } catch (error) {
    console.error(`${colors.red('Error:')} ${error.message}`);
    return null;
  }
}
rl.question(`${colors.red('Ingrese el token que desea revisar: ')}`, async (token) => {
  if (!token) {
    console.log(`${colors.red('Token no válido.')}`);
    rl.close();
  } else {
    token = token.replace(/^"(.*)"$/, '$1'); 
    console.log('');
    console.log(`${colors.red('Token en revisión:')} ${colors.yellow(token)}`);
    console.log('');

    const userData = await getUserData(token);

    if (userData) {
      console.log('');
      console.log(`${colors.red('=== Revisión de Tokens finalizada ===')}`);
      console.log('');
      console.log(`${colors.red('Usuarios revisados:')} 1`);
    }

    rl.close();
  }
});