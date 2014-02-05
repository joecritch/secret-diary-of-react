var WithSlots = {
	componentWillMount: function() {
		this.setSlots(this.props);
	},
	componentWillUpdate: function(nextProps) {
		if(!nextProps || this.props.children !== nextProps.children) {
			this.setSlots(nextProps);
		}
	},
	setSlots: function(props) {
		props.slots = {};

		// Get the slots from the children with a slot="" property
		props.children.forEach(function(child) {
			if(!child) return false; // Sometimes children aren't children at all, during conditional statements (they're 'false')
			if(child.props.slot) {
				props.slots[child.props.slot] = child;
			}
		});

		// Remove any with slot properties and add them to a separate props.
		props.children = props.children.filter(function(child, i) {
			return child && !child.props.slot;
		});
	}
};