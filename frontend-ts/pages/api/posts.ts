import ky from 'ky';
import IPost from '../../types/interface/post';

export function loadPosts(cursor?: string, userID?: string): Promise<IPost[]> {
  return ky.get(`http://localhost:4000/posts?cursor=${cursor || 0}&userID=${userID || 0}`).json();
}

export function loadPost(postID: string): Promise<IPost> {
  return ky.get(`http://localhost:4000/post?postID=${postID}`).json();
}
