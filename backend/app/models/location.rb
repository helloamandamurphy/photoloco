class Location < ApplicationRecord
  #ActiveRecord Associations
  has_many :photos
  #has_many :location_tags
  #has_many :tags, through: :location_tags

  #Model Validations
  validates :name, :lat, :long, presence: true
  validates :lat, numericality: { greater_than_or_equal_to:  -90, less_than_or_equal_to:  90 }
  validates :long, numericality: { greater_than_or_equal_to: -180, less_than_or_equal_to: 180 }

  accepts_nested_attributes_for :photos

  scope :by_id, -> {order(id: :desc)}
end
