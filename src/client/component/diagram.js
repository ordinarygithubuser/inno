import { React, Component } from 'ive-f';

/**
 * A diagram represents a graph of arbitrary connected
 * edges and nodes. In this case it is used to render
 * UML diagrams.
 */
export default class Diagram extends Component {
	constructor (props) {
		super(props);
	}

	/**
	 * TODO canvas width and height
	 * TODO render elements received from props (graph)
	 */
	render () {
		return <canvas className="diagram" droppable={true} />
	}
}