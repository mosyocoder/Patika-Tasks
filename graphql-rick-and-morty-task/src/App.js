import { Button, Col, Input, Radio, Select, Pagination, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CharacterCard from "./components/CharacterCard";
import { useQuery } from "@apollo/client";
import { GET_ALL_CHARACTERS } from "./queries";
import { FilterContext, useFilter } from "./Context/main";

function App() {
	//const genderArray = ["Male", "Famale", "Genderless", "Unknown"];

	const { page, setPage, name, setName, gender, setGender, species, setSpecies } = useFilter(FilterContext);

	const { loading, error, data } = useQuery(GET_ALL_CHARACTERS, {
		variables: {
			page,
			name,
			gender,
			species,
		},
	});

	const genderArray = ["Male", "Female", "Genderless", "Unknown"];
	const speciesArray = ["Human", "Alien", "Humanoid", "Animal", "Robot", "Cronenberg", "Mytholog", "Disease", "Poopybutthole", "Unknown"];

	const changePage = (e) => {
		setPage(e);
	};

	const searchInput = (e) => {
		setName(e.target.value);
		setPage(1);
	};

	const clearFilter = () => {
		setPage(1);
		setGender("");
		setSpecies("");
	};

	const genderRadioChange = (gen) => {
		setGender(gen.target.value);
		setPage(1);
	};

	const speciesRadioChange = (val) => {
		setSpecies(val.target.value);
		setPage(1);
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
						<Button onClick={clearFilter} type="text">
							Clear filters
						</Button>
					</div>
					<div className="gender">
						<h4>GENDER</h4>
						{
							<Radio.Group id="genderRadio" onChange={genderRadioChange}>
								<Space direction="vertical">
									{genderArray.map((gender, ix) => (
										<Radio key={ix} value={gender}>
											{gender}
										</Radio>
									))}
								</Space>
							</Radio.Group>
						}
					</div>
					<div className="species">
						<h4>SPECIES</h4>
						<Radio.Group onChange={speciesRadioChange}>
							<Space direction="vertical">
								{speciesArray.map((species, ix) => (
									<Radio key={ix} value={species}>
										{species}
									</Radio>
								))}
							</Space>
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
