import type { Comment } from "../types/comment";
import type { CommentFormData } from "../schemas/commentSchema";

const STORAGE_KEY = "comments";

const getAllComments = (): Comment[] => {
  //localStrageからcomments取得
  const savedComments = localStorage.getItem(STORAGE_KEY);

  //無ければ空配列を返す
  if(!savedComments) {
    return [];
  }
  return JSON.parse(savedComments) as Comment[];
}

//postごとのcommentを取得
export const getComments = (postId: string): Comment[] => {
  const comments = getAllComments();

  return comments.filter(
    (comment) =>comment.postId === postId
  );
};

//コメント作成
export const createComment = (
  postId:string,
  data:CommentFormData,
): Comment => {
  const comments = getAllComments();
  //現在の日付を取得
  const now = new Date().toLocaleString("ja-JP",{
    year:"numeric",
    month:"2-digit",
    day:"2-digit",
    hour:"2-digit",
    minute:"2-digit"
  });

  const newComment: Comment = {
    id: crypto.randomUUID(),
    postId,
    content:data.content,
    createdAt:now,
  };

  //一番後ろに追加
  const updatedComments = [...comments, newComment];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedComments),
  );
  return newComment
}

export const updateComment =(
  commentId: string,
  data: CommentFormData,
): Comment | undefined => {
  const comments = getAllComments();

  //map内で更新後のコメントを代入するためlet
  let updatedComment :Comment | undefined

  const updatedComments = comments.map((comment) =>{
    if(comment.id !== commentId){
      return comment;
    }

    updatedComment = {
      ...comment,
      content:data.content,
      updatedAt: new Date().toLocaleString("ja-JP"),
    };
    return updatedComment;
  });

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedComments),
  )

  return updatedComment;
}

export const deleteComment = (commentId: string): void => {
  const comments = getAllComments();

  const updatedComments = comments.filter(
    (comment) => comment.id !== commentId,
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedComments),
  );
};

  
//crypto.randomUUID()...重複しにくいランダムなIDを自動生成する