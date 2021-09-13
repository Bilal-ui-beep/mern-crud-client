import './App.css';
import React, { useState, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdUpdate } from 'react-icons/md';
import Axios from 'axios';

function App() {
	const [carName, setCarName] = useState('');
	const [carPrice, setCarPrice] = useState('');
	const [newCarName, setNewCarName] = useState('');
	const [newCarPrice, setNewCarPrice] = useState('');
	const [carList, setCarList] = useState([]);

	useEffect(() => {
		Axios.get('http://localhost:3001/read').then((Response) => {
			setCarList(Response.data);
		});
	}, []);

	const addToList = () => {
		Axios.post('http://localhost:3001/insert', { carName: carName, carPrice: carPrice });
	};

	const updatedName = (id) => {
		Axios.put('http://localhost:3001/updateName', { id: id, newCarName: newCarName });
	};

	const updatedPrice = (id) => {
		Axios.put('http://localhost:3001/updatePrice', { id: id, newCarPrice: newCarPrice });
	};

	const deleteField = (id) => {
		Axios.delete(`http://localhost:3001/delete/${id}`);
	};

	return (
		<div className='App'>
			<h1>CRUD APP</h1>
			<div className='inputHeadings'>
				<h4 className='Heading'>Vehicle Name</h4>
				<h4 className='Heading'>Vehicle Price</h4>
			</div>
			<div className='inputFields'>
				<input
					className='inputAdd'
					placeholder='Enter Vehicle`s Name'
					type='text'
					onChange={(event) => {
						setCarName(event.target.value);
					}}
				/>
				<input
					className='inputAdd'
					placeholder='Enter Vehicle`s Price'
					type='number'
					onChange={(event) => {
						setCarPrice(event.target.value);
					}}
				/>
			</div>
			<button className='addButton' onClick={addToList}>
				Add To List
			</button>

			<h1>Vehicle List</h1>
			{carList.map((val, key) => {
				return (
					<div className='mainList'>
						<div className='listItems'>
							<ul>{val.carName}</ul>
							<ul>{val.carPrice}</ul>
						</div>
						<div className='updateDiv'>
							<div className='updateDivFields'>
								<input
									type='text'
									placeholder='New Vehicle Name'
									onChange={(event) => {
										setNewCarName(event.target.value);
									}}
								/>
								<input
									type='number'
									placeholder='New Vehicle price'
									onChange={(event) => {
										setNewCarPrice(event.target.value);
									}}
								/>
							</div>
							<div className='updateButtons'>
								<button onClick={() => updatedName(val._id)}>
									<MdUpdate />
									Update Name
								</button>
								<button onClick={() => updatedPrice(val._id)}>
									<MdUpdate />
									Update Price
								</button>
							</div>
							<button className='deleteButton' onClick={() => deleteField(val._id)}>
								<AiOutlineDelete />
								Delete
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default App;
