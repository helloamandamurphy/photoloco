class Api::V1::LocationsController < ApplicationController
  def index
    @locations = Location.by_id
    render json: @locations, :include => {:photos => {only: :url}}, :except => [:created_at, :updated_at], status: 200
  end

  def show
    @location = Location.find(params[:id])
    render json: @location, :include => {:photos => {only: :url}}, :except => [:created_at, :updated_at], status: 200
  end

  def create
    @location = Location.new(location_params)
    @location.save
    @photo = Photo.new(url: params["photo"]["url"], location_id: @location.id)
    @photo.save
    render json: @location, :include => {:photos => {only: :url}}, :except => [:created_at, :updated_at], status: 200
  end

  def update
    @location = Location.find(params[:id])
    @location.update(likes: params["location"]["likes"])
    render json: @location, status: 200
  end

  def destroy
    @location = Location.find(params[:id])
    @location.delete

    render json: {locationId: @location.id}
  end


  private
    def location_params
      params.require(:location).permit(:name, :lat, :long, photos_attributes: [:url])
    end
end
