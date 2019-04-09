class UsersController < ApplicationController
  skip_before_action :ensure_signed_in, only: [:create, :login]

  def gen_token(user_id)
    payload = {id: user_id}
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

  def login
    email = params[:email]
    password = params[:password]
    puts 'hello', email

    user = User.find_by_credentials email, password
    if user.nil?
      render nothing: true, status: 401
    else
      render json: {user: user, token: gen_token(user.id)}
    end
  end

  def verify
    ensure_signed_in
    render json: { user: current_user }
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user
    else
      render json: { errors: @user.errors }, status: :unprocessable_entity
    end
  end

  def create
    new_user = User.new(user_params)
    if new_user.valid?
      new_user.save!
      user_data = {
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
    if @user.update(user_params)
      render json: @user, status: :ok
    else
      render json: { errors: @user.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    head 204
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

end
