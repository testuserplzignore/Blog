class UserCommentsController < ApplicationController

  def index
    @user = User.find(params[:user_id])
    @comments = @user.comments
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
end
