import React, { Component } from 'react'

class Footer extends Component {
    render() {
        var { toggle, getData } = this.props
        return (
            <div>
                <div class="footer">
                    <div style={{ height: 50, background: '#ec5656' }} />
                    <button onClick={() => (toggle(), getData(""))} style={{ position: "absolute", bottom: 0, backgroundColor: '#ec5656', borderRadius: 50, width: 100, height: 100, marginLeft: -60 }}>
                        <text style={{ color: "#fff", fontFamily: "'Atma', sans-serif", fontSize: 70 }}>+</text>
                    </button>
                </div>
            </div>
        )
    }
}

export default Footer
