import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/redux-toolkit/store/store";
import { Toaster, toast } from "sonner";
const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      {" "}
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" richColors />
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  );
}
