export interface PostOutputDB {
  id: string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: string;
  updated_at: string;
  creator_id: string;
  name: string;
}

export interface PostInputDB {
  id: string;
  creator_id: string;
  content: string;
}

export interface PostRawDB {
  id: string;
  creator_id: string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: string;
  updated_at: string;
}

export interface EditedPostToDB {
  idToEdit: string;
  newPost: {
    content: string;
    updated_at: string;
  };
}
