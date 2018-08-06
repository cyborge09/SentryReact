import React from 'react';
class Header extends React.Component {

    redirect = (redirectLocation) => {
        console.log("dataRedirect", this.props);
        switch (redirectLocation) {
            case "dashboard":
                this.props.history.push(`/dashboard`)
        }
    }

    render() {
        return (
            <div className="header-Head">
                <div className="header-Wrapper clearfix">
                    {/* name not sure */}
                        <ul>
                            <li><a href="#" onClick={() => this.redirect("dashboard")}>DASHBOARD</a></li>
                        </ul>
                </div>

            </div>
        )
    }
}

export default Header;