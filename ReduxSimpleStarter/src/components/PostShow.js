import React from 'react'
import {fetchPost,deletePost} from "../actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";


class PostShow extends React.Component {
    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchPost(id);
    }

    onDeleteClick(){
        const {id} = this.props.match.params;
        this.props.deletePost(id,()=>{
            this.props.history.push("/");
        })
    }
    render() {
        const {post} = this.props;
        if (!post) {
            return <div>Loading...</div>
        }
        //    console.log('--------POST SHOW POST Values-------', post);
        return (
            <div>
                <div>
                    <Link className="btn btn-primary" to="/"> Back </Link>
                    <button
                        className="btn btn-danger pull-xs-right"
                       onClick={() => this.onDeleteClick()}
                    > Delete Post</button>
                </div>
                <div>
                    <h3>Title:{post.title}</h3>
                    <h6>Categories: {post.categories}</h6>
                    <p>Content:{post.content}</p>
                </div>

            </div>

        );
    }
}

function mapStateToProps({posts}, ownProps) {
    console.log('PostShow state posts value', posts);
    return {post: posts[ownProps.match.params.id]}
    //   return {post: posts}
}

export default connect(mapStateToProps, {fetchPost,deletePost})(PostShow);