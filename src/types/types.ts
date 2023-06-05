export type Post = {
  id: number;
  title: string;
  body: string;
  comments: Comment[];
}

export type Comment = {
  id: number;
  name: string;
  email: string;
  body: string;
}