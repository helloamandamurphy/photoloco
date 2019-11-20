class Tag < ApplicationRecord
  has_many :location_tags
  has_many :locations, through: :location_tags
end
