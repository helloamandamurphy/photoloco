class Location < ApplicationRecord
  has_many :location_tags
  has_many :photos
  has_many :tags, through: :location_tags
end
