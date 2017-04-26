class Api::V1::PeopleController < ApplicationController
  def index
    @people = Person.all
    render "index.json.jbuilder"
  end

  def create
    @person = Person.new(name: params[:name], bio: params[:bio])
    @person.save
    render "show.json.jbuilder"
  end

  def show
    @person = Person.find_by(id: params[:id])
    render "show.json.jbuilder"
  end
end
