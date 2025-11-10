const fs = require('fs');

const content = `
export const environment = {
  production: true,
  supabaseUrl: '${process.env.SUPABASE_URL}',
  supabaseKey: '${process.env.SUPABASE_KEY}'
};
`;

fs.writeFileSync('src/environments/environment.prod.ts', content);
console.log('environment.prod.ts generated!');
