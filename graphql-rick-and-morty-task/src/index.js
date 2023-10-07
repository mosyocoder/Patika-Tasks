import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";

import "./index.css";
import App from "./App";
import { client } from "./apollo";
import { FilterProvider } from "./Context/main";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ApolloProvider client={client}>
		<FilterProvider>
			<App />
		</FilterProvider>
	</ApolloProvider>,
);
