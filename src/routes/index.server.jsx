import {
  useShop,
  useShopQuery,
  flattenConnection,
  Link,
  Seo,
  CacheDays,
  Image,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import Layout from '../components/Layout.server';
import FeaturedCollection from '../components/FeaturedCollection';
import ProductCard from '../components/ProductCard';
import Welcome from '../components/Welcome.server';
import {Suspense} from 'react';
import Newtoncoverpic from '../Newtoncoverphoto.png';
import '../index.css';

export default function Index({country = {isoCode: 'US'}}) {
  return (
    <Layout hero={<GradientBackground />}>
      <Suspense fallback={null}>
        <SeoForHomepage />
      </Suspense>
      <div className="relative mb-12">
        <Welcome />
        <Suspense fallback={<BoxFallback />}>
          <FeaturedProductsBox country={country} />
        </Suspense>
        <Suspense fallback={<BoxFallback />}>
          <FeaturedCollectionBox country={country} />
        </Suspense>
      </div>
    </Layout>
  );
}

function SeoForHomepage() {
  const {
    data: {
      shop: {title, description},
    },
  } = useShopQuery({
    query: SEO_QUERY,
    cache: CacheDays(),
    preload: true,
  });

  return (
    <Seo
      type="homepage"
      data={{
        title,
        description,
      }}
    />
  );
}

function BoxFallback() {
  return (
    <div className="bg-gradient-to-b from-neutral-900 to-red-800 z-10 shadow-xl rounded-xl mb-10 h-40"></div>
  );
}

function FeaturedProductsBox({country}) {
  const {languageCode} = useShop();

  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
      language: languageCode,
    },
    preload: true,
  });

  const collections = data ? flattenConnection(data.collections) : [];
  const featuredProductsCollection = collections[0];
  const featuredProducts = featuredProductsCollection
    ? flattenConnection(featuredProductsCollection.products)
    : null;

  return (
    <div className="bg-gradient-to-b from-white p-12 shadow-xl rounded-xl mb-10">
      <h2 className="aboutme text-center md:inline-flex">About Me</h2>
      {featuredProductsCollection ? (
        <>
          <div className="flex justify-between items-center mb-8 text-md font-medium">
            <span className="text-black uppercase">
              <Image
                className="coverphoto"
                style={{marginTop: '45px', borderRadius: '0.75oem'}}
                src={Newtoncoverpic}
                width={'100%'}
                height={'100%'}
              />
            </span>
            <span className="hidden flex-wrap ml-24 mt-8 md:inline-flex">
              <p>
                My passion for the internet of things really began when I was
                around 19 years old. My older brother and I decided it would be
                a great idea to build mining rigs that could hash crypto alt
                coins. We ended up building 4 distinct mining rigs and I still
                have some of those alt coins today. After that, began my road
                down learning how to manage and operate windows server, to
                managing entire networks for two doctors offices. Then, in 2018,
                I had recently gained a curiosity towards cyber security, and
                decided to persue an entry level certification from the
                University of Miami. After acquiring this certification, I
                decided I would learn more about web applications, and thus
                began my long journey into front end development.
              </p>
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="md:hidden text-center">
            <Link
              to={`/collections/${featuredProductsCollection.handle}`}
              className="text-blue-600"
            >
              Shop all
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
}

function FeaturedCollectionBox({country}) {
  const {languageCode} = useShop();

  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
      language: languageCode,
    },
    preload: true,
  });

  const collections = data ? flattenConnection(data.collections) : [];
  const featuredCollection =
    collections && collections.length > 1 ? collections[1] : collections[0];

  return (
    <div className="bg-gradient-to-b from-white p-12 shadow-xl rounded-xl mb-10">
      <h2 className="text-center text-3xl">Work History</h2>
    </div>
  );
}

function GradientBackground() {
  return (
    <div className="fixed top-0 w-full h-3/5 overflow-hidden">
      <div className="absolute w-full h-full bg-gradient-to-t from-neutral-900 to-red-800 z-10" />

      <svg
        viewBox="0 0 960 743"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className="filter blur-[30px]"
        aria-hidden="true"
      >
        <defs>
          <path fill="#fff" d="M0 0h960v540H0z" id="reuse-0" />
        </defs>
        <g clipPath="url(#a)">
          <use xlinkHref="#reuse-0" />
          <path d="M960 0H0v743h960V0Z" fill="#7CFBEE" />
          <path
            d="M831 380c200.48 0 363-162.521 363-363s-162.52-363-363-363c-200.479 0-363 162.521-363 363s162.521 363 363 363Z"
            fill="#4F98D0"
          />
          <path
            d="M579 759c200.479 0 363-162.521 363-363S779.479 33 579 33 216 195.521 216 396s162.521 363 363 363Z"
            fill="#7CFBEE"
          />
          <path
            d="M178 691c200.479 0 363-162.521 363-363S378.479-35 178-35c-200.4794 0-363 162.521-363 363s162.5206 363 363 363Z"
            fill="#4F98D0"
          />
          <path
            d="M490 414c200.479 0 363-162.521 363-363S690.479-312 490-312 127-149.479 127 51s162.521 363 363 363Z"
            fill="#4F98D0"
          />
          <path
            d="M354 569c200.479 0 363-162.521 363-363 0-200.47937-162.521-363-363-363S-9 5.52063-9 206c0 200.479 162.521 363 363 363Z"
            fill="#7CFBEE"
          />
          <path
            d="M630 532c200.479 0 363-162.521 363-363 0-200.4794-162.521-363-363-363S267-31.4794 267 169c0 200.479 162.521 363 363 363Z"
            fill="#4F98D0"
          />
        </g>
        <path fill="#fff" d="M0 540h960v203H0z" />
        <defs>
          <clipPath id="a">
            <use xlinkHref="#reuse-0" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

const SEO_QUERY = gql`
  query homeShopInfo {
    shop {
      description
    }
  }
`;

const QUERY = gql`
  query indexContent($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collections(first: 2) {
      edges {
        node {
          handle
          id
          title
          image {
            id
            url
            altText
            width
            height
          }
          products(first: 3) {
            edges {
              node {
                handle
                id
                title
                variants(first: 1) {
                  edges {
                    node {
                      id
                      title
                      availableForSale
                      image {
                        id
                        url
                        altText
                        width
                        height
                      }
                      priceV2 {
                        currencyCode
                        amount
                      }
                      compareAtPriceV2 {
                        currencyCode
                        amount
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
