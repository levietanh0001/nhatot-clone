import { QueryClientProvider } from "@tanstack/react-query";


const TanstackQueryClientProvider = ({ client, children }) => {
  return (
    <>
      <QueryClientProvider client={client}>
        {children}
      </QueryClientProvider>
    </>
  )
}

export default TanstackQueryClientProvider