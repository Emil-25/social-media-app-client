export default interface Post {
  id: number;
  title: string;
  description: string | null;
  userId: number;
  url: string;
  createdAt: string;
  numberOfLikes: number | null;
  commentIds: number[];
}
