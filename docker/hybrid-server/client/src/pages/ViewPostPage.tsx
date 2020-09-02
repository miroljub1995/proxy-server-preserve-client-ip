import React, { useMemo } from 'react'
import { ListGroup, Row } from 'react-bootstrap'
import { RouteComponentProps, Link } from 'react-router-dom'
import { usePost } from '../api/postsHooks'
import { useCommentsByPost } from '../api/commentsHooks'
import Comments, { CommentsPropType } from '../components/Post/Comments'
import Authenticated from '../components/Authenticated'

export default ({ match }: RouteComponentProps<{ id: string }>) => {
  const post = usePost(match.params.id)
  const comments = useCommentsByPost(post?._id)
  const connectedComments = useMemo(() => {
    const rootsDic: { [key: string]: CommentsPropType["comments"][0] } = {}
    comments.filter(c => !c.parent_id).forEach(e => {
      rootsDic[e._id] = { _id: e._id, text: e.text, children: [] }
    })
    comments.filter(c => c.parent_id).forEach(e => {
      rootsDic[e.parent_id!].children.push({ _id: e._id, text: e.text })
    })
    return Object.entries(rootsDic).map(([k, v]) => v)
  }, [comments])
  if (post === null)
    return <></>
  return (
    post && <ListGroup key={post._id}>
      <ListGroup.Item className="mb-3">
        <div className="d-flex justify-content-between">
          <h5>{post.title}</h5>
          <Authenticated>
            <div>
              <Link to={`/edit/post/${post._id}`}>
                <i className="fas fa-2x mx-2 fa-edit text-warning"></i>
              </Link>
              <i className="fas fa-2x mx-2 fa-trash text-danger cursor-pointer"></i>
            </div>
          </Authenticated>
        </div>
        <p>{post.text}</p>
      </ListGroup.Item>
      <Comments comments={connectedComments} />
    </ListGroup>
  )
}