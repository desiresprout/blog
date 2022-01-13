import ky from 'ky';

export function loadPosts(cursor: string, userID?: string) {
  return ky
    .get(`http://localhost:4000/posts?cursor=${cursor}&userID=${userID || 0}`)
    .json();
}

export function loadPost(postID: string) {
  return ky.get(`http://localhost:4000/post?postID=${postID}`).json();
}
