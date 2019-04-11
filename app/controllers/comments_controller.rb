class CommentsController < ApplicationController
  skip_before_action :ensure_signed_in, only: [:index]

  def index
    @post = Post.find(params[:post_id])
    @comments = @post.comments
    render json: @comments, include: :user
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
      render json: @comment
    else
      render json: { errors: @comment.errors }, status: :unprocessable_entity
    end
  end

  def update
    @comment = Comment.find(params[:id])
    if @comment.update(comment_params)
      render json: @comment, status: :ok
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
