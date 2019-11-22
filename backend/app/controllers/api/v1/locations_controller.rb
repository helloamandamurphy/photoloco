class Api::V1::LocationsController < ApplicationController
  def index
    @locations = Location.all
    render json: @locations, status: 200
  end

  def show
    @location = Location.find(params[:id])
    render json: @location, status: 200
  end

  def create
    @location = Location.create(location_params)
    render json: @location, status: 200
  end

  def update
    @location = Location.find(params[:id])
    @location.update(location_params)
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
