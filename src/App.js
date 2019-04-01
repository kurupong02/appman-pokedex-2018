import React, { Component } from 'react'
import Footer from './components/footer'

import Modal from 'react-responsive-modal';
import IconSearch from './search.png'
import Card from './components/card'


import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			arrayCardMe: [],
			data:[]
		};
		this.toggle = this.toggle.bind(this);
		this.getData = this.getData.bind(this);
		this.addCard = this.addCard.bind(this);
		this.removeCard = this.removeCard.bind(this);
	}

	handleSearch(text) {
		this.getData(text.target.value)
	}

	getData = (search) =>{
		this.setState({
			data: []
		}, function () {
			fetch(`http://localhost:3030/api/cards?name=${search}`)
				.then(response => response.json())
				.then(data => this.setListCard(data.cards));
		})
	}

	toggle() {
		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	}

	addCard(card) {
		var data = this.state.data
		var arrayCardMe = this.state.arrayCardMe
		this.setState({
			arrayCardMe: [],
			data: []
		}, function () {
			this.setState({
				arrayCardMe: [card, ...arrayCardMe],
			}, function () {
				this.setListCard(data)
			})
		})
	}

	removeCard(card) {
		var data = this.state.data

		var newArrayCardMe = this.state.arrayCardMe.filter(cardMe=>{
			return cardMe  !== card
		})

		this.setState({
			arrayCardMe: [],
			data: []
		}, function () {
			this.setState({
				arrayCardMe: newArrayCardMe,
			}, function () {
				this.setListCard(data)
			})
		})
	}

	setListCard(data) {
		var { arrayCardMe } = this.state
		var newData = data.filter(function (el) {
			if (arrayCardMe.filter(function (e) { return e.id === el.id }).length === 0) {
				return true
			}
		});
		this.setState({ data: newData })
	}

	render() {
		return (
			<div className="App">
				<div style={{ textAlign: "center",marginTop:10 }}><h1>My Pokedex</h1></div>
        <Modal showCloseIcon = {false}  open={this.state.modal} onClose={this.toggle} center >
					<div className="modal-card" >
						<div class="search">
							<span class="fa fa-search">
								<img src={IconSearch} />
							</span>
							<input type ="text" placeholder="find pokemon" onChange={(text) => { this.handleSearch(text) }} />
						</div>
						<div className="list-card" >
							{this.state.data.map(card => (
								<Card data={card} setListCard={this.addCard} text = "Add"/>
							))}
						</div>
					</div>
				</Modal>
				<div style={{marginLeft:10,marginRight:10,height: 620,overflowY: "scroll",paddingBottom:100}}>
					<div className="row">
						{this.state.arrayCardMe.map(cardMe => (
							<div style={{width:"50%"}}>
								<Card data={cardMe} setListCard={this.removeCard} text = "X"/>
							</div >
						))}
					</div>
				</div>
				<Footer toggle = {this.toggle} getData = {this.getData}/>
			</div>
		)
	}
}

export default App
