Rails.application.routes.draw do
  get 'user_comments/users'
  get 'user_comments/comments'
  get 'user_comments/posts'

  get "/users/verify", to: 'users#verify'
  post "/users/login", to: 'users#login'  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, only: [:create, :show, :update, :destroy] do
    resources :comments, controller: 'user_comments', only: [:index, :update, :destroy]
  end

  resources :posts do
    resources :comments, only: [:index, :create, :update, :destroy]
  end
end
