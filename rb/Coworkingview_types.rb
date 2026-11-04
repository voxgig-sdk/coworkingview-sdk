# frozen_string_literal: true

# Typed models for the Coworkingview SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Config entity data model.
#
# @!attribute [rw] flags
#   @return [Hash]
#
# @!attribute [rw] message
#   @return [Hash]
#
# @!attribute [rw] minSupportedBuild
#   @return [Integer]
#
# @!attribute [rw] recommendedBuild
#   @return [Integer, nil]
Config = Struct.new(
  :flags,
  :message,
  :minSupportedBuild,
  :recommendedBuild,
  keyword_init: true
)

# Request payload for Config#load.
#
# @!attribute [rw] flags
#   @return [Hash, nil]
#
# @!attribute [rw] message
#   @return [Hash, nil]
#
# @!attribute [rw] minSupportedBuild
#   @return [Integer, nil]
#
# @!attribute [rw] recommendedBuild
#   @return [Integer, nil]
ConfigLoadMatch = Struct.new(
  :flags,
  :message,
  :minSupportedBuild,
  :recommendedBuild,
  keyword_init: true
)

# Facet entity data model.
#
# @!attribute [rw] capacityRange
#   @return [Hash]
#
# @!attribute [rw] facets
#   @return [Array]
#
# @!attribute [rw] priceRange
#   @return [Hash]
Facet = Struct.new(
  :capacityRange,
  :facets,
  :priceRange,
  keyword_init: true
)

# Request payload for Facet#load.
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] locale
#   @return [String]
#
# @!attribute [rw] operator
#   @return [String, nil]
#
# @!attribute [rw] pricing_option_type
#   @return [String, nil]
#
# @!attribute [rw] zone
#   @return [String, nil]
FacetLoadMatch = Struct.new(
  :city,
  :country,
  :currency,
  :locale,
  :operator,
  :pricing_option_type,
  :zone,
  keyword_init: true
)

# Geo entity data model.
class Geo
end

# Request payload for Geo#load.
#
# @!attribute [rw] locale
#   @return [String]
GeoLoadMatch = Struct.new(
  :locale,
  keyword_init: true
)

# Health entity data model.
#
# @!attribute [rw] sha
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
Health = Struct.new(
  :sha,
  :status,
  keyword_init: true
)

# Request payload for Health#load.
#
# @!attribute [rw] sha
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
HealthLoadMatch = Struct.new(
  :sha,
  :status,
  keyword_init: true
)

# Market entity data model.
class Market
end

# Request payload for Market#load.
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] locale
#   @return [String]
MarketLoadMatch = Struct.new(
  :city,
  :country,
  :currency,
  :locale,
  keyword_init: true
)

# Operator entity data model.
#
# @!attribute [rw] asOf
#   @return [String]
#
# @!attribute [rw] cities
#   @return [Array]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] faqs
#   @return [Array]
#
# @!attribute [rw] indexabilityBrand
#   @return [Object, nil]
#
# @!attribute [rw] logo
#   @return [Hash]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] pricePosition
#   @return [Hash]
#
# @!attribute [rw] propertyCount
#   @return [Integer]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] tagline
#   @return [String, nil]
Operator = Struct.new(
  :asOf,
  :cities,
  :description,
  :faqs,
  :indexabilityBrand,
  :logo,
  :name,
  :pricePosition,
  :propertyCount,
  :slug,
  :tagline,
  keyword_init: true
)

# Request payload for Operator#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] locale
#   @return [String]
OperatorLoadMatch = Struct.new(
  :id,
  :locale,
  keyword_init: true
)

# Place entity data model.
#
# @!attribute [rw] asOf
#   @return [String]
#
# @!attribute [rw] center
#   @return [Hash]
#
# @!attribute [rw] faqs
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] intro
#   @return [String, nil]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] parent
#   @return [Hash]
#
# @!attribute [rw] priceRange
#   @return [Hash]
#
# @!attribute [rw] propertyCount
#   @return [Integer]
#
# @!attribute [rw] shortDescription
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String]
Place = Struct.new(
  :asOf,
  :center,
  :faqs,
  :id,
  :intro,
  :kind,
  :name,
  :parent,
  :priceRange,
  :propertyCount,
  :shortDescription,
  :slug,
  keyword_init: true
)

# Request payload for Place#load.
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] locale
#   @return [String]
PlaceLoadMatch = Struct.new(
  :kind,
  :slug,
  :locale,
  keyword_init: true
)

# Property entity data model.
#
# @!attribute [rw] address
#   @return [String]
#
# @!attribute [rw] amenities
#   @return [Array]
#
# @!attribute [rw] capacity
#   @return [Integer, nil]
#
# @!attribute [rw] capacity_status
#   @return [String, nil]
#
# @!attribute [rw] city
#   @return [Hash]
#
# @!attribute [rw] coordinates
#   @return [Hash]
#
# @!attribute [rw] countryCode
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String]
#
# @!attribute [rw] distanceMeters
#   @return [Float, nil]
#
# @!attribute [rw] excerpt
#   @return [String, nil]
#
# @!attribute [rw] featured
#   @return [Boolean]
#
# @!attribute [rw] fromBillingPeriod
#   @return [String, nil]
#
# @!attribute [rw] fromPrice
#   @return [Hash]
#
# @!attribute [rw] images
#   @return [Array]
#
# @!attribute [rw] indexabilityCompleteness
#   @return [Object, nil]
#
# @!attribute [rw] indexabilityState
#   @return [Object, nil]
#
# @!attribute [rw] marketPosition
#   @return [Hash]
#
# @!attribute [rw] operator
#   @return [Hash]
#
# @!attribute [rw] pricingOptions
#   @return [Array]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
#
# @!attribute [rw] webUrl
#   @return [String]
#
# @!attribute [rw] zone
#   @return [Hash]
Property = Struct.new(
  :address,
  :amenities,
  :capacity,
  :capacity_status,
  :city,
  :coordinates,
  :countryCode,
  :description,
  :distanceMeters,
  :excerpt,
  :featured,
  :fromBillingPeriod,
  :fromPrice,
  :images,
  :indexabilityCompleteness,
  :indexabilityState,
  :marketPosition,
  :operator,
  :pricingOptions,
  :slug,
  :title,
  :updatedAt,
  :webUrl,
  :zone,
  keyword_init: true
)

# Request payload for Property#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] locale
#   @return [String]
PropertyLoadMatch = Struct.new(
  :id,
  :locale,
  keyword_init: true
)

# Request payload for Property#list.
#
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] amenity
#   @return [String, nil]
#
# @!attribute [rw] bbox
#   @return [String, nil]
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] lng
#   @return [Float, nil]
#
# @!attribute [rw] locale
#   @return [String]
#
# @!attribute [rw] max_price
#   @return [Float, nil]
#
# @!attribute [rw] min_capacity
#   @return [Integer, nil]
#
# @!attribute [rw] min_price
#   @return [Float, nil]
#
# @!attribute [rw] operator
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] page_size
#   @return [Integer, nil]
#
# @!attribute [rw] pricing_option_type
#   @return [String, nil]
#
# @!attribute [rw] radius_meter
#   @return [Float, nil]
#
# @!attribute [rw] seed
#   @return [Integer, nil]
#
# @!attribute [rw] sort_by
#   @return [String, nil]
#
# @!attribute [rw] zone
#   @return [String, nil]
PropertyListMatch = Struct.new(
  :address,
  :amenity,
  :bbox,
  :city,
  :country,
  :currency,
  :lat,
  :lng,
  :locale,
  :max_price,
  :min_capacity,
  :min_price,
  :operator,
  :page,
  :page_size,
  :pricing_option_type,
  :radius_meter,
  :seed,
  :sort_by,
  :zone,
  keyword_init: true
)

# Search entity data model.
class Search
end

# Request payload for Search#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] locale
#   @return [String]
#
# @!attribute [rw] q
#   @return [String]
SearchListMatch = Struct.new(
  :limit,
  :locale,
  :q,
  keyword_init: true
)

