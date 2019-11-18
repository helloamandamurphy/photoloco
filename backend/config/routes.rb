Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :locations
      resources :tags, only: [:index, :create, :new, :show]
      resources :photos
    end
  end
end
