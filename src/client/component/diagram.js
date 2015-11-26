import { React, Component, getNode, merge } from 'ive-f';
import UpdateNodeContext from './node/update';
import NodeEdgeContext from './node/edge';
import { SetPosition, UpdateNode, SetNode } from '../action/node';
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
			offset: { x: 0, y: 0 },
			style: {},
			dragging: false,
			mousePos: null,
			selection: []
		};

		this.own('handleMouseDown', 'handleMouseUp', 'handleMouseMove');
	}

	componentDidUpdate () {
		let { context } = this.state;

		if (context) {
			context.clearRect(0, 0, 2000, 2000);
		}

		if (this.props.diagram && context) {
			this.renderTitle();
			this.renderGraph();
		}
	}

	componentDidMount () {
		let node = getNode(this);
		let { left, top, width, height } =  node.getBoundingClientRect();
		let context = node.getContext('2d');
		let style = { width, height };
		let offset = { x: left, y: top };

		node.addEventListener('mousedown', this.handleMouseDown);
		node.addEventListener('mouseup', this.handleMouseUp);
		this.setState({ context, style, offset });
		SetPosition.trigger(merge(style, offset));
	}

	componentWillUnmount () {
		getNode(this).removeEventListener('mousedown', this.handleMouseDown);
		getNode(this).removeEventListener('mouseup', this.handleMouseUp);
	}

	handleMouseDown (event) {
		let { offset } = this.state;
		let x = event.pageX - offset.x;
		let y = event.pageY - offset.y;

		for (let node of this.props.nodes) {
			if (node.x <= x && node.y <= y && node.x + node.width >= x && node.y + node.width >= y) {
				if (event.ctrlKey && this.props.node) {
					SetContext.trigger({ Component: NodeEdgeContext, data: {
						source: this.props.node, target: node
					} });
				} else {
					getNode(this).addEventListener('mousemove', this.handleMouseMove);
					this.setState({ dragging: true });
					SetContext.trigger({ Component: UpdateNodeContext, data: { node } });
					UpdateNode.trigger(node);
				}
				break;
			}
		}
	}

	handleMouseMove (event) {
		let { dragging, mousePos, offset } = this.state;
		let { node } = this.props;
		let x = event.pageX - offset.x;
		let y = event.pageY - offset.y;

		if (node && dragging && mousePos) {
			node.x -= (mousePos.x - x);
			node.y -= (mousePos.y - y);
			UpdateNode.trigger(node);
		}
		this.setState({ mousePos: { x, y } });
	}

	handleMouseUp () {
		getNode(this).removeEventListener('mousemove', this.handleMouseMove);
		this.setState({ dragging: false, mousePos: null });
	}

	renderTitle () {
		let { context } = this.state;
		let { diagram } = this.props;

		context.save();
		context.font = '24px arial';
		context.fillText(`Diagram: ${diagram.name}`, 20, 35);
		context.restore();
	}

	renderGraph () {
		let { context } = this.state;
		let { nodes, node, diagram } = this.props;

		context.save();
		context.font = '15px arial';
		context.lineWidth = 0.5;

        nodes.filter(node => {
            return node.diagramId == diagram.id;
        }).map(current => {
			let { id, name, x, y, width, height, type } = current;

			if (x % 1 == 0) x += 0.5;
			if (y % 1 == 0) y += 0.5;

			if (node && node.id == id) {
				context.strokeStyle = 'black';
				context.fillStyle = 'black';
			} else {
				context.strokeStyle = 'rgb(100, 100, 100)';
				context.fillStyle = 'rgb(100, 100, 100)';
			}

			context.beginPath();
			context.rect(x, y, width, height);
			context.fillText(type, x, y - 5);
			context.moveTo(x, y + 30);
			context.lineTo(x + width, y + 30);
			context.fillText(name || '', x + 5, y + 20);
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