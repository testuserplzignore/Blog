class UsersController < ApplicationController
  skip_before_action :ensure_signed_in, only: [:create, :login]

  def gen_token(user_id)
    payload = {id: user_id}
    puts payload
    JWT.encode!(payload, Rails.application.credentials.secret_key_base)
  end

  def login
    email = params[:email]
    password = params[:password]

    user = User.find_by_credentials email, password
    if user.nil?
      render nothing: true, status: 401
    else
      render json: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          authorization: user.authorization
        },
        token: gen_token(user.id)
      }
    end
  end

  def verify
    ensure_signed_in
    user_data = {
      id: current_user.id,
      username: current_user.username,
      email: current_user.email,
    }
    render json: user_data
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def create
    puts 'hello there general kenobi'
    puts user_params
    new_user = User.new(user_params)
    if new_user.valid?!
      new_user.save!
      user_data = {
        id: new_user.id,
        username: new_user.username,
        email: new_user.email,
      }
      render json: { user: user_data, token: gen_token(new_user.id)}
    else
      render nothing: true, status: 401
    end
  end

  def update
    @user = User.find(params[:id])
    if current_user.id == @user.id
      if @user.update(user_params)
        render json: {user: @user, token: gen_token(@user.id)}, status: :ok
      else
        render json: { errors: @user.errors }, status: :unprocessable_entity
      end
    else
      render json: {status: :unauthorized}
    end
  end

  def destroy
    @user = User.find(params[:id])
    if current_user.id == @user.id
      @user.destroy
      head 204
    else
      render json: {status: :unauthorized}
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

end
