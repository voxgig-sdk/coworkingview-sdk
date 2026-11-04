-- Typed models for the Coworkingview SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Config
---@field flags table
---@field message table
---@field minSupportedBuild number
---@field recommendedBuild? number

---@class ConfigLoadMatch
---@field flags? table
---@field message? table
---@field minSupportedBuild? number
---@field recommendedBuild? number

---@class Facet
---@field capacityRange table
---@field facets table
---@field priceRange table

---@class FacetLoadMatch
---@field city? string
---@field country? string
---@field currency? string
---@field locale string
---@field operator? string
---@field pricing_option_type? string
---@field zone? string

---@class Geo

---@class GeoLoadMatch
---@field locale string

---@class Health
---@field sha string
---@field status string

---@class HealthLoadMatch
---@field sha? string
---@field status? string

---@class Market

---@class MarketLoadMatch
---@field city? string
---@field country? string
---@field currency? string
---@field locale string

---@class Operator
---@field asOf string
---@field cities table
---@field description? string
---@field faqs table
---@field indexabilityBrand? any
---@field logo table
---@field name string
---@field pricePosition table
---@field propertyCount number
---@field slug string
---@field tagline? string

---@class OperatorLoadMatch
---@field id string
---@field locale string

---@class Place
---@field asOf string
---@field center table
---@field faqs table
---@field id? string
---@field intro? string
---@field kind string
---@field name string
---@field parent table
---@field priceRange table
---@field propertyCount number
---@field shortDescription? string
---@field slug string

---@class PlaceLoadMatch
---@field kind string
---@field slug string
---@field locale string

---@class Property
---@field address string
---@field amenities table
---@field capacity? number
---@field capacity_status? string
---@field city table
---@field coordinates table
---@field countryCode? string
---@field description string
---@field distanceMeters? number
---@field excerpt? string
---@field featured boolean
---@field fromBillingPeriod? string
---@field fromPrice table
---@field images table
---@field indexabilityCompleteness? any
---@field indexabilityState? any
---@field marketPosition table
---@field operator table
---@field pricingOptions table
---@field slug string
---@field title string
---@field updatedAt? string
---@field webUrl string
---@field zone table

---@class PropertyLoadMatch
---@field id string
---@field locale string

---@class PropertyListMatch
---@field address? string
---@field amenity? string
---@field bbox? string
---@field city? string
---@field country? string
---@field currency? string
---@field lat? number
---@field lng? number
---@field locale string
---@field max_price? number
---@field min_capacity? number
---@field min_price? number
---@field operator? string
---@field page? number
---@field page_size? number
---@field pricing_option_type? string
---@field radius_meter? number
---@field seed? number
---@field sort_by? string
---@field zone? string

---@class Search

---@class SearchListMatch
---@field limit? number
---@field locale string
---@field q string

local M = {}

return M
