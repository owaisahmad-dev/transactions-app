import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Transactions } from './components/transactions';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className="max-w-[800px] mx-auto bg-card shadow border mt-7 rounded-lg p-4">
                <Transactions />
              </div>
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
