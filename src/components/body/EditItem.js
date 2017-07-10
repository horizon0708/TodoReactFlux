import React from 'react';
import * as TaskActions from "../../actions/TaskActions";

export default class EditItem
    extends React.Component {
    constructor() {
        super();
        this.state = {
            text: ""
        }
    }

    componenetWillMount() {
        this.setState({ text: this.props.text });
    }

    handleChange = (e) => {
        this.setState({ text: e.target.value });
    }

    handleEnterPress = (props, event) => {
        var key = event.which || event.charCode;
        if (key === 13) {
            event.preventDefault();
            this.edit();
        }
    }

    edit = (e) => {
        if (this.state.text.length > 0) {
            TaskActions.editTask({
                name: this.state.text,
                parentId: this.props.parentId
            });
            this.props.editToggle();
        } else {
            this.props.editToggle();
        }
    }

    render() {
        return (
            <span className="style-4">
            <input
                type="text"
                onKeyPress={(event) => this.handleEnterPress(this.state.text, event)}
                onBlur={(e) => this.edit(e)}
                value={this.state.text}
                onChange={(e) => this.handleChange(e)}
                autoFocus /></span>
        );
    }
}

EditItem.propTypes = {
    parentId: React.PropTypes.number.isRequired,
    text: React.PropTypes.string.isRequired
}
