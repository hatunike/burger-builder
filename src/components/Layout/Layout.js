
import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
	state = {
		showSideDrawer: true
	}
	sideDrawerClosedHandler = () => {
		this.setState({showSideDrawer: false});
	}
	render() {
		return 	(	
			<Aux>
				<Toolbar />
				<SideDrawer 
						closed={this.sideDrawerClosedHandler} 
						open={this.state.showSideDrawer}/>
				<div> Toolbar, SideDrawer, Backdrop</div>
				<main className={classes.Content}>
					{this.children}
				</main>
		</Aux>
		)
	}
}

export default Layout;