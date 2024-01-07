import Page from '../components/Page';
import '../components/styles/nprogress.css';

export default function MyApp({ Component, PageProps }) {
  return (
    <Page>
      <Component {...PageProps} />
    </Page>
  );
}
