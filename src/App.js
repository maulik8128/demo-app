import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Layout from './componets/Layout';
import PostListing from './pages/PostListing';
import EditPost from './pages/EditPost';
import PageNotFound404 from './pages/PageNotFound404';
import Signup from './pages/Signup';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      // staleTime: 5 * 60 * 1000,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/posts" element={<PostListing />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
        </Route>
        <Route path="/" element={<Signup />} />
        <Route path="*" element={<PageNotFound404 />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
