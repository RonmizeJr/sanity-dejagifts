import nc from 'next-connect';

const handler = nc();

handler.get(async (req, res) => {
  const categories = ['Blankets', 'Jewlery', 'Clothing'];
  res.send(categories);
});

export default handler;
