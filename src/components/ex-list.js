import React, { Component } from 'react';

const baseUrl = process.env.BASE_URL;

const Exercise = props => (
	<tr>
		<td>{proprs.exercise.username}</td>
		<td>{props.exercise.description}</td>
		<td>{props.exercise.duration}</td>
		<td>{props.exercise.date.substring(0,10)}</td>
		<td>
			<Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
		</td>
	</tr>
)

export default class ExercisesList extends Component {
	state = {
		exercises: []
	};

	componentDidMount() {
		axios.get(`${baseUrl}/exercises/`)
			.then(res => {
				this.setState({ exercises: res.data });
			})
			.catch(err => { console.log("Error getting exercises: ", err) });
	}

	deleteExercise = (id) => {
		axios.delete(`${baseUrl}/exercises/${id}`)
			.then(res => {
				console.log(res.data)
				this.setState({
					exercises: this.state.exercises.filter(el => el._id !== id)
				})
			});
	}

	exerciseList = () => {
		return this.state.exercises.map(item => (
			<Exercise exercise={item} deleteExercise={this.deleteExercise} key={item._id} />
		));
	}

	render() {
		return (
			<div>
				<h3>Logged Exercises</h3>
				<table className="table">
					<thead className="thead-light">
						<tr>
						<th>Username</th>
						<th>Description</th>
						<th>Duration</th>
						<th>Date</th>
						<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{ this.exerciseList() }
					</tbody>
				</table>
			</div>
		);
	}
}