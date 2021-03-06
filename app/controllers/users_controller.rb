class UsersController < ApplicationController
  skip_before_action :ensure_signed_in, only: [:create, :login]

  def gen_token(user_id)
    payload = {id: user_id}
    JWT.encode(payload, Rails.application.credentials.secret_key_base)
  end

  def login
    email = params[:email]
    password = params[:password]

    @user = User.find_by_credentials email, password
    if @user.nil?
      render json: {status: 401}, status: 401
    else
      render json: UserSerializer.new(@user, { params: { token: gen_token(@user.id) } })
    end
  end

  def verify
    render json: UserSerializer.new(current_user)
  end

  def show
    @user = User.find(params[:id])
    render json: UserSerializer.new(@user)
  end

  def create
    @user = User.new(user_params)
    if @user.valid?
      @user.save!
      render json: UserSerializer.new(@user, { params: { token: gen_token(@user.id) } })
    else
      render nothing: true, status: 401
    end
  end

  def update
    @user = User.find(params[:id])
    if current_user.id == @user.id
      if @user.update(user_params)
        render json: UserSerializer.new(@user, { params: { token: gen_token(@user.id) } }), status: :ok
      else
        render json: { errors: @user.errors }, status: :unprocessable_entity
      end
    else
      render json: { status: :unauthorized }
    end
  end

  def destroy
    @user = User.find(params[:id])
    if current_user.id == @user.id
      @user.destroy
      head 204
    else
      render json: { status: :unauthorized }
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

end
