import React from 'react';
import { addReminder, deleteReminder, clearReminders } from '../actions/actions';
import { connect } from 'react-redux';
import Datetime from 'react-datetime';
import moment from 'moment';
// import { bindActionCreators } from 'redux';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            dueDate: ''
        }
    }

    addReminder() {
        console.log('this', this)
        this.props.addReminder(this.state.text, this.state.dueDate);
    }

    renderReminders() {
        const { reminders } = this.props;
        return (
            <ul className="list-group col-sm-4">
                {
                    reminders.map(reminder => {
                        return (
                            <li key={reminder.id} className='list-group-item'>
                                <div className='list-item'>
                                    <div>{reminder.text}</div>
                                    <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                                </div>
                                <div
                                    className='list-item delete-button'
                                    onClick={() => this.deleteReminder(reminder.id)}
                                >&#x2715;</div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    deleteReminder(id) {
        console.log(this.props)
        this.props.deleteReminder(id);
    }
    render() {
        return (
            <div className="App">
                <div className="title"> React Reminder</div>
                <div className="form-inline reminder-form">
                    <div className='form-group'>
                        <input
                            className='form-control'
                            placeholder="Add Reminder"
                            onChange={event => this.setState({ text: event.target.value })}
                        />
                        <Datetime
                        // type='datetime-local'
                        // className='form-control'
                        // onChange={event => this.setState({ dueDate: event.target.value })}
                        />
                        <button
                            type="button"
                            className='btn btn-success'
                            onClick={() => this.addReminder()}
                        >Add Reminder</button>
                    </div>
                </div>
                {this.renderReminders()}
                <div
                    className='btn btn-danger'
                    onClick={() => this.props.clearReminders}
                >
                    Clear Reminders
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

export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App);