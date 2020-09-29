import React from 'react';
import { addReminder } from '../actions/actions';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    addReminder() {
        console.log('this', this)
        this.props.addReminder(this.state.text);
    }
    render() {
        return (
            <div className="App">
                <div className="title"> React Reminder</div>
                <div className="form-inline">
                    <div className='form-group'>
                        <input
                            className='form-control'
                            placeholder="Add Reminder"
                            onChange={event => this.setState({ text: event.target.value })}
                        />
                        <button
                            type="button"
                            className='btn btn-success'
                            onClick={() => this.addReminder()}
                        >Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        reminders: state
    }
}
//since theirs only one action you dont need bind creators or map dispatch to props
// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({ addReminder }, dispatch)
// }
// export default connect(null, MapDispatchToProps)(App);

export default connect(mapStateToProps, { addReminder })(App);