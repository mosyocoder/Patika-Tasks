import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import "./index.css";

import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
);
