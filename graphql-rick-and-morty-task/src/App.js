import { Button, Col, Input, Radio, Select, Pagination, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CharacterCard from "./components/CharacterCard";
import { useQuery } from "@apollo/client";
import { GET_ALL_CHARACTERS, GET_LOCATIONS } from "./queries";
import { FilterContext, useFilter } from "./Context/main";

function App() {
	//const genderArray = ["Male", "Famale", "Genderless", "Unknown"];

	const { page, setPage, name, setName } = useFilter(FilterContext);

	const { loading, error, data } = useQuery(GET_ALL_CHARACTERS, {
		variables: {
			page,
			name,
		},
	});

	const {
		loading: locLoading,
		error: locError,
		data: locData,
	} = useQuery(GET_LOCATIONS, {
		variables: {},
	});

	if (locData) {
		locData.locations.results.map((loc) => {
			console.log(loc.name);
		});
	}

	const genderArray = ["Male", "Female", "Genderless", "Unknown"];
	const speciesArray = ["Human", "Alien", "Humanoid", "Animal", "Robot", "Cronenberg", "Mytholog", "Disease", "Poopybutthole", "Unknown"];

	const changePage = (e) => {
		setPage(e);
	};

	const searchInput = (e) => {
		setName(e.target.value);
	};

	return (
		<div className="app">
			<div className="header">
				<Input className="searchInput" onChange={searchInput} size="large" prefix={<SearchOutlined style={{ color: "#fff", fontSize: "25px" }} />} placeholder="Name, species, location..." />
			</div>
			<div className="container">
				<Col span={5} className="sideBar">
					<div className="title">
						<h2>Filters</h2>
						<Button type="text">Clear filters</Button>
					</div>
					<div className="gender">
						<h4>GENDER</h4>
						{
							<Radio.Group>
								<Space direction="vertical">
									{genderArray.map((gender) => (
										<Radio value={gender}>{gender}</Radio>
									))}
								</Space>
							</Radio.Group>
						}
					</div>
					<div className="species">
						<h4>SPECIES</h4>
						<Radio.Group>
							<Space direction="vertical">
								{speciesArray.map((species) => (
									<Radio value={species}>{species}</Radio>
								))}
							</Space>
						</Radio.Group>
					</div>
					<div className="location">
						<h4>LOCATION</h4>
						<Radio.Group>
							<Space direction="vertical">{}</Space>
						</Radio.Group>
					</div>
				</Col>
				<Col span={18} offset={1} className="content">
					<Pagination className="pagination" showSizeChanger={false} total={data?.characters?.info.count} showTotal={(total) => `Total ${total} items`} current={page} onChange={changePage} />
					{data?.characters?.results && <CharacterCard char={data.characters.results} />}
				</Col>
			</div>
		</div>
	);
}

export default App;
