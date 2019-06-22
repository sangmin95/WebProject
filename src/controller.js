import React from 'react';


class Controller extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            option: "rating"
        }
    }

    onChangeSelect = (event) => {
        this.setState({
            
        });
    }

    render() {
        return (
            <div>
                <select value="rating" id="select_sort" name="sorting" onChange={this.onChangeSelect}>
                    <option value="download_count">다운로드 수</option>
                    <option id="rating" value="rating">평점</option>
                    <option value="like_count">like count</option>
                </select>
                <p></p>
            </div>
        );
    }
}


export default Controller