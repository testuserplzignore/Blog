class PostsController < ApplicationController
  skip_before_action :ensure_signed_in, only: [:index, :show]

  def index
    @posts = Post.includes(:user).all
    render json: PostSerializer.new(@posts)
  end

  def show
    @post = Post.includes(:user).find(params[:id])
    render json: PostSerializer.new(@post)
  end

  def create
    if current_user.id == 1
      post_data ={
        user_id: 1,
        title: post_params['title'],
        content: post_params['content'],

      }
      puts post_data
      @post = Post.new(post_data)
      if @post.save!
        render json: PostSerializer.new(@post)
      else
        render json: { errors: @post.errors }, status: :unprocessable_entity
      end
    else
      render json: { status: :unauthorized }
    end
  end

  def update
    if current_user.id == 1
      @post = Post.find(params[:id])
      if @post.update(post_params)
        render json: PostSerializer.new(@post)
      else
        render json: { errors: @post.errors }, status: :unprocessable_entity
      end
    else
      render json: { status: :unauthorized }
    end
  end

  def destroy
    if current_user.id == 1
      @post = Post.find(params[:id])
      @post.destroy
    head 204
    else
      render json: {status: :unauthorized}
    end
  end

  private
  def post_params
    params.require(:post).permit(:title, :content, :user_id)
  end
end
