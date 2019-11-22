class Location < ApplicationRecord
  has_many :photos
  #has_many :location_tags
  #has_many :tags, through: :location_tags
  accepts_nested_attributes_for :photos
end
