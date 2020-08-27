import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Sidebar from '../components/Sidebar'
import { UserContext } from '../UserContext';

const styles = {
    root: {
        flexGrow: 1,
    },
    dashboard: {
        'font-family': 'Roboto',
    },

    namedisplay: {
        'text-align': 'center',
        'padding-top': '3vh',
    },
    navtabs: {
        flexGrow: 1,
        display: 'flex',
        height: 224,
    }
}

export class Dashboard extends React.Component {
    static contextType = UserContext

    constructor(props) {
        super(props);
    }

    render() {
        const user = this.context
        console.log(user);
        const { classes } = this.props;
        const contentArr = [{
            index: 0,
            title: 'Front page',
            content: 'content of frontpage'
        },
        {
            index: 1,
            title: 'test2',
            content: 'content of test2'
        }
        ]
        return (
            <div className={classes.dashboard}>
                <Sidebar contentArr={contentArr} />
            </div>
        )
    }
}

export default withStyles(styles)(Dashboard)