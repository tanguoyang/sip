import { Helmet } from 'react-helmet-async';
// sections
import TwoView from 'src/sections/two/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Devices</title>
      </Helmet>

      <TwoView />
    </>
  );
}
