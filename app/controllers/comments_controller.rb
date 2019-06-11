class CommentsController < ApplicationController
  skip_before_action :ensure_signed_in, only: [:index]

  def index
    @comments = paginate Comment
      .includes(:user)
      .where(post_id: params[:post_id])
      .order('id desc'),
      per_page: 10

    render json: CommentSerializer.new(@comments)
  end

  def create
    @post = Post.find(params[:post_id])
    puts comment_params
    new_comment = {
      title: comment_params['title'],
      content: comment_params['content'],
      user_id: current_user.id,
    }
    @comment = @post.comments.new(new_comment)
    if @comment.save!
      render json: CommentSerializer.new(@comment)
    else
      render json: { errors: @comment.errors }, status: :unprocessable_entity
    end
  end

  def update
    @comment = Comment.find(params[:id])
    if @comment.update(comment_params)
      render json: CommentSerializer(@comment), status: :ok
    else
      render json: { errors: @comment.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    head 204
  end
  private

  def comment_params
    params.require(:comment).permit(:title, :content, :user_id)
  end
end
