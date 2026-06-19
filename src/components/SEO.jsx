import { Helmet } from 'react-helmet-async';

function SEO({ title, description, path }) {
  const url = `https://www.vetdiaggenomix.com${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}

export default SEO;