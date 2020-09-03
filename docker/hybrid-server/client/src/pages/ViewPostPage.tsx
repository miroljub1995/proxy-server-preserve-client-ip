import React, { useCallback, useState } from 'react'
import { Col, ListGroup } from 'react-bootstrap'
import { Link, RouteComponentProps, useHistory } from 'react-router-dom'
import TextareaAutosize from 'react-textarea-autosize'
import { useCommentsByPost } from '../api/commentsHooks'
import { ApiEndpoints } from '../api/endpoints'
import { usePost } from '../api/postsHooks'
import Authenticated from '../components/Authenticated'
import { useEnterCallback } from '../components/CustomHooks'
import DeleteButton from '../components/DeleteButton'
import Comments from '../components/Post/Comments'
import { useUserStatus } from '../components/UserStatus'

export default ({ match }: RouteComponentProps<{ id: string }>) => {
  const post = usePost(match.params.id)
  const [comments, fetchAgainComments] = useCommentsByPost(post?._id)

  const history = useHistory()
  const onDelete = useCallback(async () => {
    if (post) {
      await fetch(ApiEndpoints.posts_by_id(post._id), {
        method: 'DELETE',
        credentials: 'include'
      })
      history.push('/posts')
    }
  }, [post, history])

  const [newComment, setNewComment] = useState('')
  const handleEnterOnComment = useEnterCallback(
    useCallback(async () => {
      if (post) {
        await fetch(ApiEndpoints.comments, {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({ text: newComment, post_id: post._id })
        })
        fetchAgainComments()
        setNewComment('')
      }
    }, [post, newComment, fetchAgainComments, setNewComment])
  )

  const [userStatus] = useUserStatus()

  if (post === null)
    return <></>
  return (
    post && <ListGroup key={post._id}>
      <ListGroup.Item className="mb-3">
        <div className="d-flex justify-content-between">
          <h5>{post.title}</h5>
          <Authenticated>
            {userStatus.user?._id === post.author_id && (
              <div>
                <Link to={`/edit/post/${post._id}`}>
                  <i className="fas fa-2x mx-2 fa-edit text-warning"></i>
                </Link>
                <DeleteButton onDelete={onDelete} />
              </div>)
            }
          </Authenticated>
        </div>
        <p>{post.text}</p>
      </ListGroup.Item>
      <Authenticated>
        <Col className="col-6">
          <TextareaAutosize className="write-comment p-2" value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Comment" onKeyPress={handleEnterOnComment} />
        </Col>
      </Authenticated>
      <Comments comments={comments} />
    </ListGroup>
  )
}