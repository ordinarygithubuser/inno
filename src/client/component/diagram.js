import { React, Component, getNode, merge } from 'ive-f';
import NodeContext from './diagram/node';
import { SetPosition } from '../action/diagram';
import { SetContext } from '../action/context';

/**
 * A diagram represents a graph of arbitrary connected
 * edges and nodes. In this case it is used to render
 * UML diagrams.
 */
export default class Diagram extends Component {
	constructor (props) {
		super(props);
		this.state = {
			context: null,
			active: null,
			offset: { x: 0, y: 0 },
			style: {}
		};

		this.own('handleMouseDown');
	}

	componentDidMount () {
		let node = getNode(this);
		let { left, top, width, height } =  node.getBoundingClientRect();
		let context = node.getContext('2d');
		let style = { width, height };
		let offset = { x: left, y: top };

		node.addEventListener('mousedown', this.handleMouseDown);
		this.setState({ context, style, offset });
		SetPosition.trigger(merge(style, offset));
	}

	handleMouseDown (event) {
		let { diagram } = this.props;
		let { offset } = this.state;
		let x = event.pageX - offset.x;
		let y = event.pageY - offset.y;

		if (!diagram) return;

		for (let node of diagram.graph.nodes) {
			if (node.x <= x && node.y <= y &&
				node.x + node.width >= x &&
				node.y + node.width >= y) {
				this.setState({ active: node });
				SetContext.trigger({ Component: NodeContext, data: { node } });
				break;
			}
		}
	}

	componentDidUpdate () {
		let { diagram } = this.props;
		let { context, active } = this.state;

		if (context) {
			context.clearRect(0, 0, 2000, 2000);
		}

		if (diagram && context) {
			this.renderTitle(context, diagram);
			this.renderGraph(context, diagram, active);
		}
	}

	renderTitle (context, diagram) {
		context.save();
		context.font = '24px arial';
		context.fillText(`Diagram: ${diagram.name}`, 20, 35);
		context.restore();
	}

	renderGraph (context, diagram, active) {
		context.save();
		context.font = '15px arial';

		diagram.graph.nodes.map(node => {
			let { name, x, y, width, height, type } = node;

			if (x % 1 == 0) x += 0.5;
			if (y % 1 == 0) y += 0.5;

			if (active && node.id == active.id) {
				context.lineWidth = 1.0;
				context.strokeStyle = 'black';
				context.fillStyle = 'black';
			} else {
				context.lineWidth = 0.5;
				context.strokeStyle = 'rgb(71, 71, 71)';
				context.fillStyle = 'rgb(71, 71, 71)';
			}

			context.beginPath();
			context.rect(x, y, width, height);
			context.fillText(type, x, y - 5);
			context.moveTo(x, y + 30);
			context.lineTo(x + width, y + 30);
			context.fillText(name, x + 5, y + 20);
			context.stroke();
			context.closePath();
		});
		context.restore();
	}

	/**
	 * TODO canvas width and height
	 * TODO render elements received from props (graph)
	 */
	render () {
		let { style } = this.state;
		let { width, height } = style;

		return <canvas className="diagram" style={style} width={width} height={height} />
	}
}