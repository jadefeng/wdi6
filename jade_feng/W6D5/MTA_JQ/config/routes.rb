Rails.application.routes.draw do

  root :to => 'pages#index'
  get '/route' => 'pages#route'

end
