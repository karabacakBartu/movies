const getDatabaseUrl = (): string => {
  let user = '';
  let pass = '';
  let url = '';

  user = process.env['DB_USER'];
  pass = process.env['DB_PASSWORD'];
  url = process.env['DB_URL'];
  return (
    'mongodb+srv://' +
    user +
    ':' +
    pass +
    '@' +
    url +
    '/?retryWrites=true&w=majority'
  );
};

export default getDatabaseUrl;
