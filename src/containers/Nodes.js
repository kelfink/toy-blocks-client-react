import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/nodes';
import * as actionsBlocks from '../actions/blocks';
import Node from '../components/Node';

export class Nodes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedNodeURL: null
    };
    this.toggleNodeExpanded = this.toggleNodeExpanded.bind(this);
  }

  componentDidMount() {
    this.props.actions.checkNodeStatuses(this.props.nodes.list)
  }

  toggleNodeExpanded(node) {
    this.props.actionsBlocks.getNodeBlocks(node);
    this.setState({
      expandedNodeURL: node.url === this.state.expandedNodeURL ? null : node.url
    });
  }

  render() {
    const {nodes} = this.props;
    return (
      <div>
        <h1>Nodes</h1>
        {nodes.list.map(node =>
          <Node
            node={node}
            key={node.url}
            expanded={node.url === this.state.expandedNodeURL}
            toggleNodeExpanded={this.toggleNodeExpanded}
          />
        )}
      </div>
    );
  }
}

Nodes.propTypes = {
  actions: PropTypes.object.isRequired,
  nodes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    nodes: state.nodes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    actionsBlocks: bindActionCreators(actionsBlocks, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nodes);
