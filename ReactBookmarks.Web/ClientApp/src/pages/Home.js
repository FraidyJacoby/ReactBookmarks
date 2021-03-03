import React from 'react';
import axios from 'axios';

class Home extends React.Component {

    state = {
        topBookmarks: []
    }

    componentDidMount = async () => {
        const { data } = await axios.get('/api/bookmark/gettopfive');
        this.setState({ topBookmarks: data });
    }
    render() {
        return (
            <>
                <span className="textSuccess" style={{ fontSize:35 }}>Top Bookmarks</span>
                <table className="table table-bordered" style={{ marginTop: 15 }}>
                    <thead>
                        <tr>
                            <th>Url</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.topBookmarks.map(b =>
                            <tr>
                                <td><a href={b.url} target="_blank" rel="noopener noreferrer">{b.url}</a></td>
                                <td>{b.count}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </>
        );
    }
}

export default Home;
