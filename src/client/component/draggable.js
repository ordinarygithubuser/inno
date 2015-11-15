import { React, Component } from 'ive-f';

let removeReactIds = function (node) {
	if (node.removeAttribute) {
		node.removeAttribute('data-reactid');
	}
	let children = node.childNodes;
	for (let i = 0; i < children.length; i++) {
		removeReactIds(children[i]);
	}
};

let toPX = function (expr) {
	return expr + "px";
};

export default function Draggable(IComponent, onDragStart = () => {}, onDragStop = () => {}) {
	class DraggableComponent extends Component {
		componentDidMount() {
			const componentDOMNode = React.findDOMNode(this);
			componentDOMNode.addEventListener('mousedown',this.handleComponentMouseDown);
		}

		componentWillUnmount() {
			const componentDOMNode = React.findDOMNode(this);
			componentDOMNode.removeEventListener('mousedown', this.handleComponentMouseDown);
		}

		// Initiate drag
		handleComponentMouseDown = event => {
			let originalDOMNode = React.findDOMNode(this),
				width = originalDOMNode.offsetWidth,
				height = originalDOMNode.offsetHeight;

			// Make a clone of the original component
			this.clone = originalDOMNode.cloneNode(true);

			removeReactIds(this.clone);

			this.clone.style.position = 'absolute';
			this.clone.style.top = toPX(event.pageY - height / 3);
			this.clone.style.left = toPX(event.pageX - width / 2);
			this.clone.style.zIndex = 100;
			this.clone.style.width = width;
			this.clone.style.boxShadow = '0 1px 5px #777';
			this.clone.style.border = '1px solid #bbb';

			// Set 200ms timeout for the drag event so user can click the component
			// without it starting to drag immediately
			document.addEventListener('mouseup', this.handleDocumentMouseUp);
			this.mouseDownTimer = setTimeout(()=> {
				this.isDragging = true;
				document.body.appendChild(this.clone);
				document.addEventListener('mousemove', this.handleDocumentMouseMove);

				// First callback
				onDragStart(this.props, event);

			}, 200);
		}

		// Move cloned component when dragging according to mouse movement
		handleDocumentMouseMove = event => {
			this.clone.style.top = toPX(event.pageY - this.clone.offsetHeight / 3);
			this.clone.style.left = toPX(event.pageX - this.clone.offsetWidth / 2);
		}

		// Stop dragging, remove clone from DOM and invoke onDragStop on mouse up
		// (If mouseDown lasted longer than the timeout)
		handleDocumentMouseUp = event => {
			clearTimeout(this.mouseDownTimer);
			document.removeEventListener('mouseup', this.handleDocumentMouseUp);
			if (this.isDragging) {
				document.removeEventListener('mousemove',
					this.handleDocumentMouseMove);
				document.body.removeChild(this.clone);
				this.clone = undefined;

				// Second callbback
				onDragStop(this.props, event);

				this.isDragging = false;
			} else {
				this.clone = undefined;
			}
		}

		render() {
			return (
				<IComponent {...this.props} {...this.state} />
			);
		}
	}

	return DraggableComponent;
}