import { Link, Route, Routes, useLocation } from "react-router-dom";
import Questions from "./pages/Questions";
import { Menu, Row, Col } from "antd";
import NewQuestion from "./pages/NewQuestion";
import "./App.css";

function App() {
	const location = useLocation();

    const menuItems = [
		{
			key: "/",
			label: <Link to={"/"}>Questions</Link>,
		},
		{
			key: "/new",
			label: <Link to={"/new"}>New Question</Link>,
		},
    ];

    return (
		<Row className="container">
			<Col className="menu" span={24}>
				<Menu mode="horizontal" selectedKeys={location.pathname} items={menuItems} />
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
