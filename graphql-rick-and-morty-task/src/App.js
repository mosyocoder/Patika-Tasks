import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function App() {
	return (
		<div className="container">
			<Input className="searchInput" size="large" prefix={<SearchOutlined style={{ color: "#fff", fontSize: "25px" }} />} placeholder="Name, species, location..." />
		</div>
	);
}

export default App;
