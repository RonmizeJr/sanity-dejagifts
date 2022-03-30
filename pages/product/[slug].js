import {
  Alert,
  Box,
  CircularProgress,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import classes from '../../utils/classes';
import client from '../../utils/client';

export default function ProductScreen(props) {
  const { slug } = props;
  const { state, setState } = useState({
    product: null,
    loading: true,
    error: '',
  });
  const { product, loading, error } = state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await client.fetch(
          `
              *[_type == "product" && slug.current == $slug] [0]`,
          { slug }
        );
        setState({ ...state, product, loading: false });
      } catch (err) {
        setState({ ...state, error: err.message, loading: false });
      }
    };
    fetchData();
  }, []);

  return (
    <Layout title={product?.title}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant="error">{error}</Alert>
      ) : (
        <Box>
          <Box sx={classes.section}>
            <NextLink>
              <Link>
                <Typography>&larr;back to result</Typography>
              </Link>
            </NextLink>
          </Box>
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <Image
                src={urlFor(product.image)}
                alt={product.name}
                layout="responsive"
                width={640}
                height={640}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </Layout>
  );
}

export function getServerSideProps(context) {
  return {
    props: {
      slug: context.params.slug,
    },
  };
}
