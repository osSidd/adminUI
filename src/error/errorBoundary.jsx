import React, { Component } from "react";

class ErrorBoundary extends Component{
    constructor(props){
        super(props)
        this.state = {
            error: null,
            errorInfo: null,
        }
    }

    componentDidCatch(error, errorInfo){
        this.setState({
            error: error,
            errorInfo: errorInfo   
        })
    }

    render(){
        if(this.state.error)
            return <Fallback error={this.state.error} errorInfo={this.state.errorInfo} />
        return this.props.children
    }
}

function Fallback({error, errorInfo}){
    return (
        <div style={{width:'75%'}}>
            <h2>Something went wrong</h2>
            <details>
                {error.toString()}
                <br /><br />
                {errorInfo.componentStack}
            </details>
        </div>
    )
}

export default ErrorBoundary