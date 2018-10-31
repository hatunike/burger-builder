
import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
	state = {
		showSideDrawer: false
	}

	sideDrawerClosedHandler = () => {
		this.setState({showSideDrawer: false});
	}

	menuButtonHandler = () => {
		const isOpen = this.state.showSideDrawer;
		this.setState({showSideDrawer: !isOpen})
	}

	render() {
		return 	(	
			<Aux>
				<Toolbar menuClicked={this.menuButtonHandler}/>
				<SideDrawer 
						closed={this.sideDrawerClosedHandler} 
						open={this.state.showSideDrawer}/>
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Aux>
		)
	}
}

export default Layout;