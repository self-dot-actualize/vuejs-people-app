Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get "/people" => "people#index"
    end
  end

  get "/people" => "people#index"
end
