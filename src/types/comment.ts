export default interface Comment {
  id: number;
  comment: string;
  createdAt: string;
  userId: number;
  postId: number;
  numberOfLikes: number;
}
