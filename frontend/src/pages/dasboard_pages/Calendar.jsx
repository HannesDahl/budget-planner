import React from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import events from '../../utils/events';
import * as dates from '../../utils/dates';
import './Calendar.scss';
import moment from 'moment';
import Firebase from '../../Firebase';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import ErrorHandler from '../../ErrorHandler';
import Loader from '../../components/Loader'

class BigCalendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: null
        }
    }

    componentDidMount() {
        const fire = new Firebase();

        fire.getData()
            .then((data) => {
                let calendarData = []
                for (let i = 0; i < data.length; i++) {
                    const dataObj = {
                        title: data[i].title,
                        start: new Date(data[i].date),
                        end: new Date(data[i].date),
                        amount: data[i].amount
                    }
                    calendarData.push(dataObj)
                }
                this.setState({
                    events: calendarData
                })

            }).catch(err => new ErrorHandler(err.message))
    }

    render() {
        const { events } = this.state
        const local = momentLocalizer(moment)
        if (events) {
            return (
                <div>
                    <Calendar
                        localizer={local}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{
                            height: 750
                        }} />
                </div>
            )
        } else {
            return (
                <Loader />
            )
        }
    }
}

export default BigCalendar
