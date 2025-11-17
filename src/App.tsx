import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';

// React Query クライアントの作成
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen w-full flex flex-col">
        <Router>
          <AuthProvider>
            <div className="flex-1 flex flex-col">
              <AppRoutes />
            </div>
          </AuthProvider>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
