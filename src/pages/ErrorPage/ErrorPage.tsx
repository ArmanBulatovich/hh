import { useRouteError } from 'react-router-dom';
import { Box } from '@chakra-ui/react'
// import Page from './page';

export default function ErrorPage() {
  const error = useRouteError();

  let message;

  if (error.status === 404) {
    message = <p>There's nothing here.</p>;
  } else if (error.status === 500) {
    message = <p>There was a problem fetching the data for this page.</p>;
  } else {
    message = <p>An unexpected error occurred.</p>;
  }

  return <Box mt="50px" display='flex' justifyContent='center' fontSize='30px' title={error.statusText ?? 'Error'}>{message}</Box>;
}
