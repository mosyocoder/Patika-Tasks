import React from "react";

function CharacterCard(props) {
	return (
		<>
			<div className="characters">
				{props.char.map((char) => (
					<div className="card" key={char.id}>
						<img src={char.image} alt="" />
						<p>{char.species.toUpperCase()}</p>
						<p>{char.name}</p>
						<p>{char.location.name}</p>
					</div>
				))}
			</div>
		</>
	);
}

export default CharacterCard;
