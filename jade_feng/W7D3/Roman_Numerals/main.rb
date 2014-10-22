require 'sinatra'
require 'sinatra/reloader'
require 'json'

get '/' do
  erb :index
end