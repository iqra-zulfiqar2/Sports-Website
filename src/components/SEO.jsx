// src/components/SEO.js
import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({
  title,
  description,
  url,
  canonical,
  author,
  publisher,
  lang = 'en',
  robots = 'index, follow',
}) => {
  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{title}</title>

      {/* Meta Tags */}
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <meta name="author" content={author} />
      <meta name="publisher" content={publisher} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonical || url} />
    </Helmet>
  );
};

export default SEO;
