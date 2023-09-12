import { Link, Route, Routes, useLocation } from "react-router-dom";
import Questions from "./pages/Questions";
import { Menu, Row, Col } from "antd";
import NewQuestion from "./pages/NewQuestion";
import "./App.css";

function App() {
	const location = useLocation();

	return (
		<Row className="container">
			<Col className="menu" span={24}>
				<Menu mode="horizontal" selectedKeys={location.pathname}>
					<Menu.Item key="/">
						<span>Questions</span>
						<Link to="/" />
					</Menu.Item>
					<Menu.Item key="/new">
						<span>New Question</span>
						<Link to="/new" />
					</Menu.Item>
				</Menu>
			</Col>
			<Col className="content">
				<Routes>
					<Route path="/" element={<Questions />} />
					<Route path="/new" element={<NewQuestion />} />
				</Routes>
			</Col>
		</Row>
	);
}

export default App;
